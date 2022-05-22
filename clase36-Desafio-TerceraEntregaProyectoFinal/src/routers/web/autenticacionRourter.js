const express = require("express")
const router = express.Router()
const {
    passport,
    isAuth,
    hashPassword
} = require('../../utils/authorization')

const mensajeria = require('../../utils/mensajeria')

//============================[Base de Datos]============================
const userDAO = require('../../daos/RegisterUserDaoMongoDB')

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
        const hash = hashPassword(password)
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
        const mensaje = `<h2 style="color: blue;">Se registro un nuevo usuario en la App Ecommerce:</h2>
        <ul>
            <li>Nombre: ${nombre}</li>
            <li>Email: ${email}</li>
            <li>Dirección: ${direccion}</li>
            <li>Edad: ${edad}</li>
            <li>Teléfono Celular: ${celular}</li>
            <li>Foto url: ${avatar}</li>
        </ul>
        <h2 style="color: blue;">Mensaje desde la App Ecommerce.</h2>
        `
        mensajeria.gmail(asunto, mensaje)
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
    let emailUser = req.user.email 
    if (!emailUser) emailUser = ''
    res.render('logout', {
        email: emailUser
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;