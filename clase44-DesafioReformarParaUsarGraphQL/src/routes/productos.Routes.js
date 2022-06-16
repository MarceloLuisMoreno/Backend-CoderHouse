const express = require("express")
const router = express.Router()
const middlewares = require('../middlewares/middlewares')
const validations = require('../middlewares/validations')
const auth = require('../middlewares/authentication/authentic')


const ProductoController = require("../controllers/Producto.controller.js")

const productos = ProductoController


router.get("/", auth.usersAuth, async (req, res) => {
    try {
        res.json(await productos.listarAll())
    } catch (err) {
        next(err)
    }
})

router.get("/:id", auth.usersAuth, async (req, res, next) => {
    try {
        res.json(await productos.listar(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.post("/", auth.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    try {
        res.json(await productos.guardar(req.body))
    } catch (err) {
        next(err)
    }
})

router.put("/:id", auth.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    try {
        res.json(await productos.actualizar(req.params.id, req.body))
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", auth.usersAuth, middlewares.isAdmin, async (req, res, next) => {
    try {
        res.json(await productos.borrar(req.params.id))
    } catch (err) {
        next(err)
    }
})

module.exports = router;