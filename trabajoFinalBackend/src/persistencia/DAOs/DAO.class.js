const CustomError = require('../../classes/CustomError.class.js')

class DAO {
    async listarTodos() {
        throw new CustomError(500, "Falta implementar 'listarTodos' en Sub Clase")
    }

    async listar() {
        throw new CustomError(500, "Falta implementar 'listar' en Sub Clase")
    }

    async listarCategoria() {
        throw new CustomError(500, "Falta implementar 'listar categoría' en Sub Clase")
    }

    async guardar() {
        throw new CustomError(500, "Falta implementar 'guardar' en Sub Clase")
    }

    async actualizar() {
        throw new CustomError(500, "Falta implementar 'actualizar' en Sub Clase")
    }

    async borrar() {
        throw new CustomError(500, "Falta implementar 'borrar' en Sub Clase")
    }

    async borrarTodos() {
        throw new CustomError(500, "Falta implementar 'borrarTodos' en Sub Clase")
    }

    async leerCarritoCliente() {
        throw new CustomError(500, "Falta implementar 'leerCarritoCliente' en Sub Clase")
    }

    async guardarProductoCarrito() {
        throw new CustomError(500, "Falta implementar 'guardarProductoCarrito' en Sub Clase")
    }

    async actualizarCarrito() {
        throw new CustomError(500, "Falta implementar 'actualizarCarrito' en Sub Clase")
    }

    async borrarCarrito() {
        throw new CustomError(500, "Falta implementar 'borrarCarrito' en Sub Clase")
    }

    async cantidadOrdenes() {
        throw new CustomError(500, "Falta implementar 'cantidadOrdenes' en Sub Clase")
    }

}

module.exports = DAO