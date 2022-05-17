const mongoose = require('mongoose')
const config = require('../utils/config.js')
const URL = config.mongoRemote.cnxStr

const logger = require('../loggers/logger')

/* mongoose.connect(URL)
    .then(logger.info('Base de datos Mongoose conectada'))
    .catch((error) => {
        logger.warn(`Error al conectar Mongoose Atlas: ${error}.`)
    }) */

module.exports = class ContenedorMongo {
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
            logger.error(`Error al listar todo: ${error}.`)
            throw new Error(`Error al listar todo: ${error}`)
        }
    };

    getById = async (id) => {
        try {
            let buscado = await this.coleccion.find({
                    _id: {
                        $eq: id
                    }
                })
                .then(res => res)
            if (buscado.length === 0) return null
            else return buscado
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

    deleteById = async (id) => {
        try {
            const borrado = await this.coleccion.deleteOne({
                _id: {
                    $eq: id
                }
            })
            if (borrado.modifieCount === 0) {
                logger.error(`Error en id: ${id}`)
                throw new Error(`en id: ${id}`)
            } else return void(0)
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            throw new Error(`Error al borrar id: ${error}`)
        }
    }

    updateById = async (id, newElemento) => {
        try {
            const {
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            } = newElemento;
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            const modificado = await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    timestamp: timestamp,
                    nombre: nombre,
                    description: descripcion,
                    codigo: codigo,
                    foto: foto,
                    precio: precio,
                    stock: stock
                }
            })
            if (modificado.modifieCount === 0 || !modificado.modifieCount) {
                logger.error(`Error al actualizar id: ${id}`)
                throw new Error(`Error al actualizar id: ${id}`)
            } else return void(0)

        } catch (error) {
            throw error
        }
    };

    // Métodos únicamente para el carrito
    // ----------------------------------

    saveCart = async (id, elemento) => {
        try {
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            const cliente = id
            const newElemento = {
                ...elemento,
                timestamp,
                cliente
            };
            const elemen = new this.Modelo(newElemento)
            const save = await elemen.save()
                .then(res => res)
            return save.cliente
        } catch (error) {
            logger.error(`Error al guardar: ${error}`)
            throw new Error(`Error al guardar: ${error}`)
        }
    };



    getByCart = async (cliente) => {
        try {
            let buscado = await this.coleccion.find({
                    cliente: {
                        $eq: cliente
                    }
                })
                .then(res => res)
            if (buscado.length === 0) return null

            else {
                return buscado
            }
        } catch (error) {
            logger.error(`Error no se ecuentra id: ${id}`)
            throw new Error(`Error no se ecuentra id: ${id}`)
        }
    };

    saveProductCart = async (cliente, newProduct) => {
        try {
            let carrito = await this.getByCart(cliente)
            let productos = carrito[0].productos
            productos.push(newProduct[0])
            await this.coleccion.updateOne({
                cliente: cliente
            }, {
                $set: {
                    productos: productos
                }
            })
            return void(0)
        } catch (error) {
            logger.error(`Error al guardar: ${error}`)
            throw new Error(`Error al guardar: ${error}`)
        }
    };

    deleteByCart = async (id) => {
        try {
            const borrado = await this.coleccion.deleteOne({
                cliente: {
                    $eq: id
                }
            })
            if (borrado.modifieCount === 0)
                throw new Error(`en id: ${id}`)
            else return void(0)
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            throw new Error(`Error al borrar id: ${error}`)
        }
    }


    deleteProductCart = async (cliente, idProd) => {
        try {
            const carrito = await this.getByCart(cliente)
            let productos = await carrito[0].productos
            const indexProd = productos.findIndex(idProduc => idProduc._id == idProd)
            if (indexProd != -1) {
                const newProductos = productos.filter(product => product._id != idProd)
                carrito.productos = newProductos
                const borrar = await this.coleccion.updateOne({
                    cliente: cliente
                }, {
                    $set: {
                        productos: carrito.productos
                    }
                })
                return void(0)
            } else {
                logger.error(`Error al borrar Producto id: ${idProd}, del carrito ${cliente}.`)
                throw new Error(`Error al borrar Producto id: ${idProd}, del carrito ${cliente}.`)
            }
        } catch (error) {
            throw error
        }
    }

}