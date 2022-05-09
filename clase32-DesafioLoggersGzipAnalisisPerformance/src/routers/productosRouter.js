const express = require("express")
const router = express.Router()

const middlewares = require('../utils/middlewares')
const validations = require('../utils/validations')

//Defino las bases de datos con las que voy a trabajar
const {
    knexMySQL
} = require('../../options/dbMySQL');
// Clase contenedor: creo una instancia para productos en la base de datos con tabla products
const Contenedor = require('../contenedores/ContenedorSQL')
const contenedorProductos = new Contenedor(knexMySQL, 'products')
const auth = require('../authentication/authentic')


const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock(knexMySQL, 'products')


router.get("/", auth.usersAuth, async (req, res) => {
    try {
        res.json(await contenedorProductos.getAll())
    } catch (err) {
        next(err)
    }
})

router.get("/:id", auth.usersAuth, async (req, res, next) => {
    try {
        res.json(await contenedorProductos.getById(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.post("/", auth.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    try {
        res.json(await contenedorProductos.saveProduct(req.body))
    } catch (err) {
        next(err)
    }
})

router.put("/:id", auth.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    try {
        res.json(await contenedorProductos.updateById(req.params.id, req.body))
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", auth.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    try {
        res.json(await contenedorProductos.deleteById(req.params.id))
    } catch (err) {
        next(err)
    }
})

module.exports = router;