/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import MongoDBClient from "../Classes/MongoDBClient.class.js";
import logger from "../utils/loggers.js";
/*========== Modulos especifico para DAOs ==========*/
import ProductoModel from "../models/Producto.model.js";
import DAO from "./DAO.class.js";

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

export default ProductosDAOMongoDB;