/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../Classes/CustomError.class.js")
const MongoDBClient = require("../../MongoDBClient.class.js")
const logger = require("../../../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const CarritoModel = require("../../models/Carrito.model.js")
const DAO = require("../DAO.class")

class CarritosDAOMongoDB extends DAO {
    constructor() {
        super();
        if (CarritosDAOMongoDB.instancia) return CarritosDAOMongoDB.instancia
        this.collection = CarritoModel;
        this.conn = new MongoDBClient();
        CarritosDAOMongoDB.instancia = this
    }

    async listarTodos() {
        try {
            return await this.collection.find({})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Carritos.', error);
            logger.error(cuserr);
        }
    }

    async listar(id) {
        try {
            return await this.collection.find({
                _id: {
                    $eq: id
                }
            })
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar Carrito id ${id}`, error);
            logger.error(cuserr);
        }
    }

    async leerCarritoCliente(clie) {
        try {
            return await this.collection.find({
                cliente: {
                    $eq: clie
                }
            })
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar Carrito cliente ${cliente}`, error);
            logger.error(cuserr);
        }
    }

    async guardarNuevo(carrito) {
        try {
            return await this.collection.create(carrito)
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar carrito.', error);
            logger.error(cuserr)
        }
    }

    async guardaProductoCarrito(cliente, producto, carrito) {
        try {
            let productos = carrito[0].productos
            productos.push(producto[0])
            return await this.collection.updateOne({
                cliente: cliente
            }, {
                $set: {
                    productos: productos
                }
            })
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar carrito.', error);
            logger.error(cuserr)
        }
    }

    async actualizarCarrito(cliente, productos) {
        try {
            await this.collection.updateOne({
                cliente: cliente
            }, {
                $set: {
                    productos: productos
                }
            })
            return void(0)
        } catch (error) {
            error => {
                logger.error(`Error al actualizar carrito id: ${id}`)
                const cuserr = new CustomError(500, 'Error al actualizar Carrito. ', error);
                throw cuserr
            }
        }
    };

    async borrarCarrito(cliente) {
        try {
            return await this.collection.deleteOne({
                cliente: {
                    $eq: cliente
                }
            })
        } catch (error) {
            logger.error(`Error al borrar Carrito id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar Carrito. ', error);
            throw cuserr
        }
    }

    async borrarTodos() {
        try {
            return await this.collection.deleteMany({})
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar todos los carritos. ', error);
            throw cuserr
        }
    }

}

module.exports = CarritosDAOMongoDB;