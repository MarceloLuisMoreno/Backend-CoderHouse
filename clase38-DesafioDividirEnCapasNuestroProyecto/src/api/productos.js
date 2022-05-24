Contenedor = require("../contenedores/ContenedorSQL")
generarData = require('../utils/generadorProductos')

module.exports = class ApiProductosMock extends Contenedor {
    constructor() {
        super()
    }

    popular() {
        const productos = []
        for (let id = 1; id < 6; id++) {
            const nuevoProd = generarData(id)
            productos.push(nuevoProd)
        }
        return productos
    }
}