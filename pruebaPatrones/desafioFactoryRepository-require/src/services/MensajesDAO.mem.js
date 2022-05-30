/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../Classes/CustomError.class.js")
const logger = require("../utils/loggers.js")
const DAO = require("./DAO.class.js")

class MensajesDAOMem extends DAO {
    constructor() {
        super();
        this.colecction = [];
    }

    listarAll() {
        let docs = [];
        try {
            docs = this.colecction;
            return docs;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elementos listados ${docs.length}`);
        }
    }

    guardar(elemento) {
        let doc = null;
        try {
            if (!this.validarDuplicidad(elemento.id)) {
                doc = elemento;
                this.colecction.push(elemento);
                return doc;
            } else {
                doc = {
                    code: 401,
                    msg: "id repetido"
                };
                return doc;
            }
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${JSON.stringify(doc)}`);
        }
    }

}

module.exports = MensajesDAOMem;