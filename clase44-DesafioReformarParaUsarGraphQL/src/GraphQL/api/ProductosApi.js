const config = require("../../config/config")
const Producto = require('../models/Productos.js')

let ProductosDao
switch (config.srv.persistencia) {
    case 'mongodb':
        ProductosDao = require('../daos/ProductosDaoMongoDB')
        break
    case 'file':
        ProductosDao = require('../DAOS/ProductosDaoFile')
        break
    default:
        ProductosDao = require('../daos/ProductosDaoMem')
        break
}


module.exports = class ProductosApi {
    constructor() {
        this.dao = new ProductosDao()
    }

    listarProductos = () => {
        return this.dao.listarProductos()
    }

    listarProducto = ({
        id
    }) => {
        return this.dao.listarProducto(id)
    }

    nuevoProducto = async ({
        datos
    }) => {
        const objs = await this.dao.listarProductos();
        const productos = Object.values(objs)
        const id = productos.length + 1
        const nuevoProducto = new Producto(id, datos)
        this.dao.saveProducto(nuevoProducto)
        return nuevoProducto
    }

    actualizarProducto = ({
        id,
        datos
    }) => {
        const actualizado = this.dao.updateProducto(id, datos)
        return actualizado
    }

    deleteProducto = ({
        id
    }) => {
        const deleted = this.dao.deleteProducto(id)
        return deleted
    }

}