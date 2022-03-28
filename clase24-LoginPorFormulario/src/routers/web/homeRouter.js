const express = require("express")
const router = express.Router()
const path = require("path");
const auth = require('../../authentication/authentic')

//Router que habilita entrar al servidor una vez que cuenta con una sesión
router.get('/home', auth.webAuth, (req, res) => {
   res.render(path.join(process.cwd(), '/public/views/pages/home.ejs'), { nombre: req.session.nombre })
})

module.exports = router;