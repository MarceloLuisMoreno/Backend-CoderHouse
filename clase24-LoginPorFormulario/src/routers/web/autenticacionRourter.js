const express = require("express")
const router = express.Router()
const path = require("path");


//Router de autenticación de sesión
router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/public/index.html'))
    }
})


router.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/public/views/pages/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


router.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})

module.exports = router;