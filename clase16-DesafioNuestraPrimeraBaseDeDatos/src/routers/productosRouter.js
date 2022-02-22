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

router.get("/", async (req, res) => {
    await contenedorProductos.getAll().then(result => {
        res.send(result)
    })
})

router.get("/:id", async (req, res, next) => {
    await contenedorProductos.getById(req.params.id).then(result => {
        res.send(result)
    })
})

router.post("/", async (req, res, next) => {
    console.log(req.body)
    if (administrador) {
        await contenedorProductos.saveProduct(req.body).then(result => {
            res.send(result)
        })
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})

router.put("/:id", async (req, res, next) => {
    if (administrador) {
        await contenedorProductos.updateById(req.params.id, req.body).then(result => {
            res.send(result)
        })
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})

router.delete("/:id", async (req, res, next) => {
    if (administrador) {
        await contenedorProductos.deleteById(req.params.id).then(result => {
            res.send(result)
        })
    } else {
        res.send(noAutorizado(req.originalUrl, req.method))
    }
})

module.exports = router;