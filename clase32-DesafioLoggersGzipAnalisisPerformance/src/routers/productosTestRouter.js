const express = require("express")
const router = express.Router()
const config = require("../utils/config")

//Variable booleana administrador
let administrador = config.administrador
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

const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock(knexMySQL, 'products')

const logger = require('../loggers/logger')

//usando Faker.js
router.get('/', async(req, res, next) => {
    logger.info(`Ruta: /api/productos-test, Método: get.`)
    try{
        const products = await apiProductos.popular()
        res.json(products)
    }
    catch(error){
        next(error)
    }
}
    )


module.exports = router;