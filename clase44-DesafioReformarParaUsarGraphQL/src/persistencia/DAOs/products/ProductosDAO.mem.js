/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../Classes/CustomError.class.js")
const logger = require("../../../loggers/logger")
const DAO = require("../DAO.class.js")


class ProductosDAOMem extends DAO {
    constructor() {
        super();
        if (ProductosDAOMem.instancia) return ProductosDAOMem.instancia
        this.colecction = [];
        ProductosDAOMem.instancia = this
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

    listar(id) {
        let producto = null;

        try {
            producto = this.colecction.find(producto => {
                return producto.id == id;
            });
            return producto;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar(id)', error);
            logger.error(cuserr);
            throw cuserr;
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
                return doc.id;
            }
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${JSON.stringify(doc)}`);
        }
    }

    actualizar(elemento) {
        let doc = null;

        try {
            const index = this.colecction.findIndex(producto => producto.id == elemento.id);

            if (index == -1) {
                doc = {
                    code: 401,
                    msg: "id no encontrado"
                };
            } else {
                this.colecction[index] = elemento;
                doc = this.colecction[index];
            }

            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al actualizar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento modificado ${JSON.stringify(doc)}`);
        }
    }

    eliminar(id) {
        let doc = null;

        try {
            const index = this.colecction.findIndex(producto => producto.id == id);

            if (index == -1) {
                doc = {
                    code: 401,
                    msg: "id no encontrado"
                };
            } else {
                doc = this.colecction.splice(index, 1);
            }

            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al eliminar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento eliminado ${JSON.stringify(doc)}`);
        }
    }

    validarDuplicidad(id) {
        try {
            let producto = this.colecction.find(producto => {
                return producto.id == id;
            });

            if (producto) {
                return true;
            } else {
                return false;
            }
        } catch (error) {

        }
    }
}

module.exports = ProductosDAOMem;