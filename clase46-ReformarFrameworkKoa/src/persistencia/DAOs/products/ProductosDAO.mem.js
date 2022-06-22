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
        docs = this.colecction;
        logger.info(`Elementos listados ${docs.length}`);
        return docs;
    }


    listar(id) {
        let producto = null;
        producto = this.colecction.find(producto => {
            return producto.id == id;
        });
        logger.info(`Elemento listado ${id} `);
        return producto;
    }

    guardar(elemento) {
        const colec = this.colecction
        const id = colec.length + 1
        const newObj = {
            ...elemento,
            id: id
        }
        this.colecction.push(newObj);
        logger.info(`Elemento guardado ${id} `);
        return newObj.id;
    }

    actualizar(id, elemento) {
        let doc = id
        const index = this.colecction.findIndex(producto => producto.id == id);
        if (index < 0) {
            doc = {
                code: 400,
                msg: "id no encontrado"
            };
        } else {
            this.colecction[index] = elemento
            logger.info(`Elemento actualizado ${id}`);
        }
        return doc;
    }


    borrar(id) {
        let doc = id
        const index = this.colecction.findIndex(producto => producto.id == id);
        if (index < 0) {
            doc = {
                code: 400,
                msg: "id no encontrado"
            };
        } else {
            this.colecction.splice(index, 1);
            logger.info(`Elemento eliminado ${id}`);
        }
        return doc;
    }

}

module.exports = ProductosDAOMem;