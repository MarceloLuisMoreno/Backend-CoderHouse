/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../Classes/CustomError.class.js")
const MongoDBClient = require("../Classes/MongoDBClient.class.js")
const logger = require("../utils/loggers.js")
/*========== Modulos especifico para DAOs ==========*/
const ProductoModel = require("../models/Producto.model.js")
const DAO = require("./DAO.class.js")

class ProductosDAOMongoDB extends DAO {
    constructor() {
        super();
        this.colecction = ProductoModel;
        this.conn = new MongoDBClient();
    }

    async listarAll() {
        let docs = [];
        try {
            await this.conn.connect();
            docs = await this.colecction.find({})
            return docs;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elementos listados ${docs.length}`);
        }
    }

    async listar(id) {
        let doc;
        try {
            await this.conn.connect();
            doc = await this.colecction.findOne({
                id: id
            })
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar id ${id}`, error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elemento listado id: ${id}`);
        }
    }

    async guardar(elemento) {
        try {
            await this.conn.connect();
            let doc = await this.colecction.create(elemento);
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elemento guardado ${elemento}`);
        }
    }

    async borrarAll() {
        try {
            await this.conn.connect();
            let doc = await this.colecction.deleteMany({});
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al borrarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Coleccion eliminada.`);
        }
    }

}

module.exports = ProductosDAOMongoDB;