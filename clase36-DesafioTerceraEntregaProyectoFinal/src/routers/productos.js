const express = require("express")
const router = express.Router()
const apiProductos = require('../api/apiProductos')
const middlewares = require('../utils/middlewares')
const validations = require('../utils/validations')


// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores) 
router.get("/", apiProductos.getProducts)

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.get("/:id", apiProductos.getProduct)

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
router.post("/", middlewares.isAdmin, validations.validate(validations.validationProduct), apiProductos.saveProduct)

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 
router.put("/:id", middlewares.isAdmin, validations.validate(validations.validationProduct), apiProductos.updateProdById)

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
router.delete("/:id", middlewares.isAdmin, apiProductos.deleteProduct)


module.exports = router;