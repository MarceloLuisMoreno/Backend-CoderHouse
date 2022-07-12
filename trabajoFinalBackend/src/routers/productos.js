const express = require("express")
const router = express.Router()
const productos = require('../controllers/Producto.controller')
const middlewares = require('../middlewares/middlewares')
const validations = require('../middlewares/validations')

// GET: '/' - Me permite listar todos los productos disponibles(disponible para usuarios y administradores) 
router.get("/", middlewares.usersAuth, productos.listarTodos)

// GET: '/:id?' - Me permite listar producto por su id (disponible para usuarios y administradores)
router.get("/:id", middlewares.usersAuth, productos.listar)

// GET: '/' - Me permite listar los productos por categoria disponibles(disponible para usuarios y administradores) 
router.get("/categoria/:categoria", middlewares.usersAuth, productos.listarCategoria)

// POST: '/' - Para incorporar productos al listado (disponible solo para administradores)
router.post("/", middlewares.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), productos.guardar)

// PUT: '/:id' - Actualiza un producto por su id (disponible solo para administradores) 
router.put("/:id", middlewares.usersAuth, middlewares.isAdmin, validations.validate(validations.validationProduct), productos.actualizar)

// DELETE: '/:id' - Borra un producto por su id (disponible solo para administradores)
router.delete("/:id", middlewares.usersAuth, middlewares.isAdmin, productos.borrar)


module.exports = router;