const express = require("express")
const router = express.Router()
const auth = require('../../authentication/authentic')

//Router que habilita entrar al servidor una vez que cuenta con una sesión
router.get('/home', auth.webAuth, (req, res) => {
   res.render('home', { nombre: req.session.nombre })
})

module.exports = router;