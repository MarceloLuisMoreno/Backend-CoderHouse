const mongoose = require('mongoose')
const config = require('../../config.js')
const URL = config.mongoLocal.cnxStr


mongoose.connect(URL)
    .then(console.log('Base de datos Mongoose conectada'))
    .catch((error) => {
        console.log(`Error: ${error}`)
    })

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
            throw new Error(`Error al listar id: ${error}`)
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
            if (!borrado.modifieCount)
                throw next(error)
            else return void(0)
        } catch (error) {
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
            if (!modificado.modifieCount)
                throw next(error)
            else return void(0)

        } catch (error) {
            throw new Error(`Error al actualizar id: ${error}`)
        }
    };

    // Métodos únicamente para el carrito
    // ----------------------------------
    saveProductCart = async (id, newProduct) => {
        try {
            let carrito = await this.getById(id)
            let productos = carrito[0].productos
            productos.push(newProduct)
            await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    productos: productos
                }
            })
            return void(0)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };

    deleteProductCart = async (id, idProd) => {
        try {

            const carrito = await this.getById(id)
            let productos = await carrito[0].productos
            const newProductos = productos.filter(product => product._id != idProd)
            carrito.productos = newProductos
            const borrado = await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    productos: carrito.productos
                }
            })
            if (!borrado.modifieCount)
                throw next(error)
            else return void(0)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}