const express = require("express")
const router = express.Router()
const passport = require("passport")
const {
    Strategy: LocalStrategy
} = require("passport-local")
const bcrypt = require('bcrypt')
const logger = require('../../loggers/logger')

//const nodemailer = require('nodemailer')



// cargo las configuraciones del sistema de .ENV
// const config = require("../../utils/config")

const mensajeria = require('../../utils/mensajeria')

/* const emailUser = config.emailUser
const emailPass = config.emailPass

// ========= Configuracion Nodemailer con gmail 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});
 */



/* ========= Configuracion bcrypt =================== */
const rounds = 12

const hashPassword = (password, rounds) => {
    const hash = bcrypt.hashSync(password, rounds, (err, hash) => {
        if (err) {
            logger.error(err)
            return err
        }
        return hash
    })
    return hash
}

const comparePassword = (password, hash) => {
    const bool = bcrypt.compareSync(password, hash, (err, res) => {
        if (err) {
            logger.error(err)
            return false
        }
        return res
    })
    return bool
}

/*============================[Base de Datos]============================*/
const userDAO = require('../../daos/RegisterUserDaoMongoDB')


/*----------- Passport -----------*/
passport.use(new LocalStrategy(async function (email, password, done) {
    let existeUsuario
    try {
        existeUsuario = await userDAO.getById(email)
    } catch (err) {
        throw done(err)
    }
    if (!existeUsuario) {
        logger.info('Usuario no encontrado')
        return done(null, false);
    }
    const bool = await comparePassword(password, existeUsuario.password)
    if (bool == false) {
        logger.info('Contraseña invalida')
        return done(null, false);
    }

    return done(null, existeUsuario);
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
})

passport.deserializeUser(async (email, done) => {
    let usuario
    try {
        usuario = await userDAO.getById(email)
    } catch (err) {
        throw done(err)
    }
    done(null, usuario);
});


/* functions */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}


//Router de autenticación de sesión
router.get('/', (req, res) => {
    if (req.session.email) {
        res.redirect('/home')
    } else {
        res.redirect('/login')
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login-error'
}))

router.get('/login-error', (req, res) => {
    res.render('login-error');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    const {
        email,
        nombre,
        direccion,
        edad,
        celular,
        avatar,
        password
    } = req.body;
    let newUsuario = null
    try {
        newUsuario = await userDAO.getById(email)
    } catch (err) {
        throw new Error(err)
    }
    if (newUsuario) {
        res.render('register-error')
    } else {
        const hash = hashPassword(password, rounds)
        const usuarioData = {
            email,
            nombre,
            direccion,
            edad,
            celular,
            avatar,
            password: hash
        }
        try {
            const graba = await userDAO.saveElement(usuarioData)
        } catch (err) {
            throw new Error(err)
        }
        const asunto = 'Nuevo Registro'
        const mensaje = `<h1 style="color: blue;">Se registro un nuevo usuario en la App Ecommerce:  <span style="color: green;"> ${email} </span></h1>`
        mensajeria.gmail(asunto,mensaje)
        res.redirect('/login')
    }
});

router.get('/home', isAuth, (req, res) => {
    res.cookie('user', req.user.email, {
        signed: false
    })
    res.render('home', {
        nombre: req.user.nombre,
        email: req.user.email,
        direccion: req.user.direccion,
        edad: req.user.edad,
        celular: req.user.celular,
        avatar: req.user.avatar
    });
});

router.get('/fired', (req, res) => {

    res.render('logout', {
        email: req.user.email 
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;