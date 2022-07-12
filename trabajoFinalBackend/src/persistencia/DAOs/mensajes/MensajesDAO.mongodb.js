/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../classes/CustomError.class")
const MongoDBClient = require("../../MongoDBClient.class.js")
const logger = require("../../../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const MensajeModel = require("../../models/Mensaje.model.js")
const DAO = require("../DAO.class.js")

class MensajesDAOMongoDB extends DAO {
    constructor() {
        super();
        if (MensajesDAOMongoDB.instancia) return MensajesDAOMongoDB.instancia
        this.collection = MensajeModel;
        this.conn = new MongoDBClient();
        MensajesDAOMongoDB.instancia = this
    }

    async listarTodos() {
        try {
            return await this.collection.find({})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Mensajes.', error);
            logger.error(cuserr);
        }
    }

    async listar(email) {
        try {
            return await this.collection.find({
                $or: [{
                    "author.mail": {
                        $eq: email
                    }
                }, {
                    "emailpara": {
                        $eq: email
                    }
                }]
            })
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar id ${id}`, error);
            logger.error(cuserr);
        }
    }

    async guardar(mensaje) {
        try {
            await this.collection.create(mensaje)
            return
        } catch (error) {
            logger.error(`Error al guardar: ${error}`)
            const cuserr = new CustomError(500, `Error al listar id ${id}`, error);
        }
    }

}

module.exports = MensajesDAOMongoDB;