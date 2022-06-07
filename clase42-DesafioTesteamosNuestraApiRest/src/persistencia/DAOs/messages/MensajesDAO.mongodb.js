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
        this.colecction = MensajeModel;
        this.conn = new MongoDBClient();
        MensajesDAOMongoDB.instancia = this
    }

    async listarAll() {
        let docs = []
        try {
            //            await this.conn.connect();
            docs = await this.colecction.find({})
            if (docs.length === 0) return null
            return docs
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Mensajes.', error);
            logger.error(cuserr);
            throw cuserr
        } finally {
            //            this.conn.disconnect();
            logger.info(`Mensajes listados ${docs.length}`);
        }
    }


    async guardar(mensaje) {

        try {
            //  await this.conn.connect();
            const doc = new this.colecction(mensaje)
            const save = await doc.save().then(res => res)
            return save._id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar Mensaje', error);
            logger.error(cuserr)
            throw cuserr
        } finally {
            //            this.conn.disconnect();
            logger.info(`Elemento Mensaje guardado.`);
        }
    }


}

module.exports = MensajesDAOMongoDB;