/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../Classes/CustomError.class.js")
const MongoDBClient = require("../../MongoDBClient.class.js")
const logger = require("../../../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const OrdenModel = require("../../models/Ordenes.model.js")
const DAO = require("../DAO.class")

class OrdenesDAOMongoDB extends DAO {
    constructor() {
        super();
        if (OrdenesDAOMongoDB.instancia) return OrdenesDAOMongoDB.instancia
        this.collection = OrdenModel;
        this.conn = new MongoDBClient();
        OrdenesDAOMongoDB.instancia = this
    }

    async listarTodos() {
        try {
            return await this.collection.find({})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Ordenes.', error);
            logger.error(cuserr);
        }
    }

    async listar(email) {
        try {
            return await this.collection.find({
                email: {
                    $eq: email
                }
            })
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar Ordenes de compra Usuario id ${cliente}`, error);
            logger.error(cuserr);
        }
    }

    async guardar(orden) {
        try {
            return await this.collection.create(orden)
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar Orden.', error);
            logger.error(cuserr)
        }
    }

    async borrar(cliente) {
        try {
            return await this.collection.deleteOne({
                email: {
                    $eq: cliente
                }
            })
        } catch (error) {
            logger.error(`Error al borrar Usuario id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar Usuario. ', error);
            throw cuserr
        }
    }

    async borrarTodos() {
        try {
            return await this.collection.deleteMany({})
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar todos los Ordenes. ', error);
            throw cuserr
        }
    }

    async cantidadOrdenes() {
        try {
            return await this.collection.count()
        } catch (error) {
            logger.error(`Error al totalizar ordenes de compra: ${error}`)
            const cuserr = new CustomError(500, 'Error al totalizar ordenes de compra. ', error);
            throw cuserr
        }
    }

}

module.exports = OrdenesDAOMongoDB;