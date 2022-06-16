const ProductoModel = require('../../persistencia/models/Producto.model')
const MongoDBClient = require('../../persistencia/MongoDBClient.class')
const logger = require('../../loggers/logger')
const CustomError = require("../../classes/CustomError.class")

module.exports = class ProductosDao {
    constructor() {
        this.colecction = ProductoModel;
        this.conn = new MongoDBClient();
    }

    async listarProductos() {
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

    async listarProducto(id) {
        let doc;
        try {
            //            await this.conn.connect();
            doc = await this.colecction.find({
                _id: {
                    $eq: id
                }
            })
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

    async saveProducto(obj) {
        try {
            //            await this.conn.connect();
            let doc = await this.colecction(obj);
            const save = await doc.save().then(res => res)
            return doc._id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr)
            throw cuserr
        } finally {
            //            this.conn.disconnect();
            logger.info(`
                            Elemento guardado $ {
                                obj
                            }
                            `);
        }

    }

    async updateProducto(id, elem) {
        try {
            const {
                title,
                price,
                thumbnail
            } = elem;
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
                logger.error(`
                            Error al actualizar id: $ {
                                id
                            }
                            `)
                throw new Error(`
                            Error al actualizar id: $ {
                                id
                            }
                            `)
            } else return void(0)

        } catch (error) {
            throw error
        }
    }

    async deleteProducto(id) {
        try {
            const borrado = await this.coleccion.deleteOne({
                _id: {
                    $eq: id
                }
            })
            if (borrado.modifieCount === 0) {
                logger.error(`
                            Error en id: $ {
                                id
                            }
                            `)
                throw new Error(`
                            en id: $ {
                                id
                            }
                            `)
            } else return void(0)
        } catch (error) {
            logger.error(`
                            Error al borrar id: $ {
                                error
                            }
                            `)
            throw new Error(`
                            Error al borrar id: $ {
                                error
                            }
                            `)
        }
    }
}