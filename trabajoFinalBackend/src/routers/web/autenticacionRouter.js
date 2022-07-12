const express = require("express")
const router = express.Router()
const {
    passport,
    hashPassword
} = require('../../middlewares/authentication/passport')
const {
    isAuth
} = require('../../middlewares/middlewares')
const mensajeria = require('../../utils/mensajeria')

//============================[Base de Datos Usuarios]============================
const UsuariosDAOFactory = require("../../persistencia/DAOs/UsuarioDAOFactory.class")
const DAOusr = UsuariosDAOFactory.get()

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
    newUsuario = await DAOusr.listar(email)
    if (newUsuario) {
        res.render('register-error')
    } else {
        const hash = hashPassword(password)
        const newTimestamp = new Date()
        const timestamp = newTimestamp.toLocaleString()
        const usuarioData = {
            timestamp,
            email,
            nombre,
            direccion,
            edad,
            celular,
            avatar,
            password: hash
        }
        try {
            const graba = await DAOusr.guardar(usuarioData)
        } catch (error) {
            logger.error(`Error al guardar: ${error}`)
            return res.status(500).json({
                error_description: 'Server error.'
            });
        }
        mensajeria.gmailNuevo(usuarioData)
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
    try {
        let emailUser = req.user.email
        if (!emailUser) emailUser = ''
        res.render('logout', {
            email: emailUser
        });
        req.session.destroy();
    } catch (error) {
        res.redirect('/login')
    }
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;