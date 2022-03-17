const admin = require('firebase-admin')
const serviceAccount = require('../../DB/basefirebase-17f9c-firebase-adminsdk-e24we-18a617e251.json')
const config = require('../../config.js')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseURL
})
const db = admin.firestore()


module.exports = class ContenedorFirebase {
    constructor(coleccion) {
        this.query = db.collection(coleccion)
        this.coleccion = coleccion
    }

    getAll = async () => {
        try {
            const query = await this.query.get()
            const lista = query.docs
            const response = (this.coleccion === 'productos') ?
                lista.map((doc) => ({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    nombre: doc.data().nombre,
                    descripcion: doc.data().descripcion,
                    codigo: doc.data().codigo,
                    foto: doc.data().foto,
                    precio: doc.data().precio,
                    stock: doc.data().stock
                })) : lista.map((doc) => ({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    productos: doc.data().productos
                }))

            return response
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    };

    getById = async (id) => {
        try {
            const doc = await this.query.doc(`${id}`).get()
            let response
            if (doc.data()) {
                response = (this.coleccion === 'productos') ? {
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    nombre: doc.data().nombre,
                    descripcion: doc.data().descripcion,
                    codigo: doc.data().codigo,
                    foto: doc.data().foto,
                    precio: doc.data().precio,
                    stock: doc.data().stock
                } : {
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    productos: doc.data().productos
                }
            } else {
                throw new Error('No se encontro.')
            }
            return response
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
            const grabar = await this.query.add(newElemento)
            const newId = grabar._path.segments[1]
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };


    deleteById = async (id) => {
        try {
            const doc = this.query.doc(`${id}`).delete()
            return void(0)
        } catch (error) {
            throw new Error(`Error al borrar id: ${error}`)
        }
    }

    updateById = async (id, newElemento) => {
        try {
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            await this.query.doc(`${id}`).update(newElemento)
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
            let productos = carrito.productos
            productos.push(newProduct)
            carrito.productos = productos
            await this.query.doc(`${id}`).update(carrito)
            return void(0)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };

    deleteProductCart = async (id, idProd) => {
        try {
            const carrito = await this.getById(id)
            if (!carrito) throw new Error("Carrito no encontrado.")
            else {
                let productos = carrito.productos
                const indexProd = productos.findIndex(idProduc => idProduc.id == idProd)
                if (indexProd != -1) {
                    const newProductos = productos.filter(product => product.id != idProd)
                    carrito.productos = newProductos
                    await this.query.doc(`${id}`).update(carrito)
                    return void(0)
                } else throw new Error('Producto no existe.')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}