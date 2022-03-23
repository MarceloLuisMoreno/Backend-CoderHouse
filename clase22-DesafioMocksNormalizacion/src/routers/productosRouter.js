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



//Defino las bases de datos con las que voy a trabajar
const {
    knexMySQL
} = require('../../options/dbMySQL');
// Clase contenedor: creo una instancia para productos en la base de datos con tabla products
const Contenedor = require('../../src/Contenedor')
const contenedorProductos = new Contenedor(knexMySQL, 'products')

const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock(knexMySQL, 'products')


router.get("/", async (req, res) => {
    try {
        res.json(await contenedorProductos.getAll())
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await contenedorProductos.getById(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    console.log(req.body)
    if (administrador) {
        try {
            res.json(await contenedorProductos.saveProduct(req.body))
        } catch (err) {
            next(err)
        }
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})

router.put("/:id", async (req, res, next) => {
    if (administrador) {
        try {
            res.json(await contenedorProductos.updateById(req.params.id, req.body))
        } catch (err) {
            next(err)
        }
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})

router.delete("/:id", async (req, res, next) => {
    if (administrador) {

        try {
            res.json(await contenedorProductos.deleteById(req.params.id))
        } catch (err) {
            next(err)
        }
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})



module.exports = router;