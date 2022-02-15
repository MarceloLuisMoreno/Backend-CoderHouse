const express = require("express")
const router = express.Router()

//Variable booleana administrador
let administrador = Boolean(true)
//Funcion usuario no autorizado 
noAutorizado = (ruta, metodo) => {
     return {
        error: -1,
        descripcion: `ruta ${ruta}, Método: ${metodo} no autorizado.`
    }
}

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

router.post("/", async (req, res, next) => {
    // POST: '/' - Para incorporar productos al listado (disponible para administradores)
    if (administrador) {
        const newProduct = await contenedorProductos.saveProduct(req.body)
            .catch(err => next(err))
        res.send({
            status: 'OK'
        })
        res.redirect('http://localhost:8080/static') 

    } else {
        res.send( noAutorizado(req.originalUrl, req.method))
    }
})

router.put("/:id", async (req, res, next) => {
    // PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 
    if (administrador) {
        const producto = await contenedorProductos.updateById(req.params.id, req.body)
            .catch(err => next(err))
        if (producto === null) return res.status(404).send({
            error: 'Producto no encontrado.'
        })
        else
            res.send({
                status: 'OK'
            })
    } else {
        res.send( noAutorizado(req.originalUrl, req.method))
    }
})

router.delete("/:id", async (req, res, next) => {
    // DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
    if (administrador) {
        const buscado = await contenedorProductos.deleteById(req.params.id)
            .catch(err => next(err))
        if (buscado === null) return res.status(404).send({
            error: 'Producto no encontrado.'
        })
        else res.send({
            status: 'OK'
        })
    } else {
        res.send( noAutorizado(req.originalUrl, req.method))
    }
})

module.exports = router;