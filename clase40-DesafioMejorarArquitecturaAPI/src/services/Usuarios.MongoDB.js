const mongoose = require('mongoose')

const config = require('../config/config')
const URL = config.mongoRemote.cnxStr
const logger = require('../loggers/logger')

mongoose.connect(URL)
    .then(logger.info('Base de datos Mongoose Atlas conectada'))
    .catch((error) => {
        logger.error(`Error: ${error}`)
    })

module.exports = class UsuarioDAOMongoDB {
    constructor(elementModel) {
        this.coleccion = elementModel
        this.Modelo = elementModel
    }

    getAll = async () => {
        try {
            const lista = await this.coleccion.find({})
            if (lista.length === 0) return null
            return lista
        } catch (error) {
            logger.error(`Error al listar todo: ${error}`)
            throw new Error(`Error al listar todo: ${error}`)
        }
    };

    getById = async (id) => {
        try {
            let buscado = await this.coleccion.find({
                    nombre: {
                        $eq: id
                    }
                })
                .then(res => res)
            if (buscado.length === 0) return null
            else {
                return buscado[0]
            }
        } catch (error) {
            logger.error(`Error no se ecuentra id: ${id}`)
            throw new Error(`Error no se ecuentra id: ${id}`)
        }
    };

    saveElement = async (elemento) => {
        try {
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            const newElemento = {
                ...elemento,
                timestamp
            };
            const elemen = new this.Modelo(newElemento)
            const save = await elemen.save()
                .then(res => res)
            return save._id
        } catch (error) {
            logger.error(`Error al guardar: ${error}`)
            throw new Error(`Error al guardar: ${error}`)
        }
    };


}