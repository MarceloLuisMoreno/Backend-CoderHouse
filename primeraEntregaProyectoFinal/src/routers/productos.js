const express = require("express")
const router = express.Router()
const middlewares = require('../middlewares')
const validations = require('../validations')

// Clase contenedor: creo una instancia para productos
const Contenedor = require('../Contenedor')
const contenedorProductos = new Contenedor('./public/data/productos.json')

router.get("/", async (req, res) => {
    // GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores) 
    const todos = await contenedorProductos.getAll()
        .catch(err => next(err))
    res.send(todos)
})

router.get("/:id", async (req, res, next) => {
    // GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    try {
        const buscado = await contenedorProductos.getById(req.params.id)
            .catch(err => next(err))
        if (!buscado) res.status(404).send({
            error: 'Producto no encontrado.'
        })
        res.send(buscado)
    } catch (err) {
        return next(err)
    }
})

router.post("/", middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    // POST: '/' - Para incorporar productos al listado (disponible para administradores)
    const newProduct = await contenedorProductos.saveProduct(req.body)
        .catch(err => next(err))
    res.send({
        status: 'OK'
    })
    res.redirect('http://localhost:8080/static')
})

router.put("/:id", middlewares.isAdmin, validations.validate(validations.validationProduct), async (req, res, next) => {
    // PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 
    const producto = await contenedorProductos.updateById(req.params.id, req.body)
        .catch(err => next(err))
    if (producto === null) return res.status(404).send({
        error: 'Producto no encontrado.'
    })
    else
        res.send({
            status: 'OK'
        })
})

router.delete("/:id", middlewares.isAdmin, async (req, res, next) => {
    // DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
    const buscado = await contenedorProductos.deleteById(req.params.id)
        .catch(err => next(err))
    if (buscado === null) return res.status(404).send({
        error: 'Producto no encontrado.'
    })
    else res.send({
        status: 'OK'
    })
})

module.exports = router;