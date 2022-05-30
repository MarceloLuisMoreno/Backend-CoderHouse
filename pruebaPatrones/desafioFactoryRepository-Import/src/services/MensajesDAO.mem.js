/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";
import DAO from "./DAO.class.js";

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

export default MensajesDAOMem;