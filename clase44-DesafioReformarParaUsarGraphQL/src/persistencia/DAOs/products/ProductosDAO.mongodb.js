/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../Classes/CustomError.class.js")
const MongoDBClient = require("../../MongoDBClient.class.js")
const logger = require("../../../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const ProductoModel = require("../../models/Producto.model.js")
const DAO = require("../DAO.class")

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
                    $eq: id
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

    async actualizar(id, newElemento) {
        try {
            const {
                title,
                price,
                thumbnail
            } = newElemento;
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            const modificado = await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    timestamp: timestamp,
                    title: title,
                    price: price,
                    thumbnail: thumbnail
                }
            })
            if (modificado.modifieCount === 0 || !modificado.modifieCount) {
                logger.error(`Error al actualizar id: ${id}`)
                throw new Error(`Error al actualizar id: ${id}`)
            } else return void(0)

        } catch (error) {
            throw error
        }
    };

    async borrar(id) {
        try {
            const borrado = await this.coleccion.deleteOne({
                _id: {
                    $eq: id
                }
            })
            if (borrado.modifieCount === 0) {
                logger.error(`Error en id: ${id}`)
                throw new Error(`en id: ${id}`)
            } else return void(0)
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            throw new Error(`Error al borrar id: ${error}`)
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