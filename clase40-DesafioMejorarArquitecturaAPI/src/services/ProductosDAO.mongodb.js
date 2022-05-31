/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../Classes/CustomError.class.js")
const MongoDBClient = require("../Classes/MongoDBClient.class.js")
const logger = require("../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const ProductoModel = require("../models/Producto.model.js")
const DAO = require("./DAO.class.js")

class ProductosDAOMongoDB extends DAO {
    constructor() {
        super();
        if (ProductosDAOMongoDB.instancia) return ProductosDAOMongoDB.instancia
        this.colecction = ProductoModel;
        this.conn = new MongoDBClient();
        ProductosDAOMongoDB.instancia = this
    }

    async listarAll() {
        let docs = []
        try {
            //            await this.conn.connect();
            docs = await this.colecction.find({})
            return docs
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Productos.', error);
            logger.error(cuserr);
            throw cuserr
        } finally {
            //            this.conn.disconnect();
            logger.info(`Productos listados: ${docs.length}`);
        }
    }

    async listar(id) {
        let doc;
        try {
            //            await this.conn.connect();
            doc = await this.colecction.find({
                _id: {
                    $eq: _id
                }
            }).then(res => res)
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar id ${id}`, error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            //            this.conn.disconnect();
            logger.info(`Elemento listado id: ${id}`);
        }
    }

    async guardar(elemento) {
        try {
            //            await this.conn.connect();
            let doc = await this.colecction(elemento);
            const save = await doc.save().then(res => res)
            return doc._id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr)
            throw cuserr
        } finally {
            //            this.conn.disconnect();
            logger.info(`Elemento guardado ${elemento}`);
        }
    }

    async borrarAll() {
        try {
            //            await this.conn.connect();
            let doc = await this.colecction.deleteMany({});
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al borrarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            //            this.conn.disconnect();
            logger.info(`Coleccion eliminada.`);
        }
    }

}

module.exports = ProductosDAOMongoDB;