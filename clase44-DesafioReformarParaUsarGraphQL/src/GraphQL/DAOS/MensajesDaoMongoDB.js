const CustomError = require("../../classes/CustomError.class")
const MensajeModel = require('../../persistencia/models/Mensaje.model')
const MongoDBClient = require('../../persistencia/MongoDBClient.class')
const logger = require('../../loggers/logger')


module.exports = class MensajesDao {
    constructor() {
        this.colecction = MensajeModel;
        this.conn = new MongoDBClient();
    }

    async listarMensajes() {
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

    async saveMensaje(obj) {
        try {
            //  await this.conn.connect();
            mensaje = {
                author: obj.author,
                text: obj.text,
                date: obj.date
            }
            const doc = new this.colecction(mensaje)
            const save = await doc.save()
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