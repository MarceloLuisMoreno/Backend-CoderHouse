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
            if (!lista) return null
            return lista
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    };

    saveAll = async (nuevaLista) => {
        try {
            const newLista = new this.coleccion(nuevaLista)
            await newLista.save();
        } catch (error) {
            throw error
        }
    };

    getById = async (id) => {
        try {
            const buscado = await this.coleccion.find({
                _id: {
                    $eq: id
                }
            })
            return buscado
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
            await elemen.save()
            return newElemento
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };

    deleteById = async (id) => {
        try {
            await this.coleccion.deleteOne({
                _id: {
                    $eq: id
                }
            })
            return void(0)
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
            await this.coleccion.updateOne({
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
            return void(0)
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
            let productos = carrito[0].productos
            const newProductos = productos.filter(product => product.id != idProd)
            carrito.productos = newProductos
            await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    productos: carrito.productos
                }
            })
            return void(0)


        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}