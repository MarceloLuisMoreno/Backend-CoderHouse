/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../Classes/CustomError.class.js")
const logger = require("../loggers/logger")
const {
    promises: fs
} = require('fs')
const config = require("../config/config")
const DAO = require("./DAO.class.js")


class ProductosDAOFile extends DAO {
    constructor(ruta) {
        if (ProductosDAOFile.instancia) return ProductosDAOFile.instancia
        super();
        this.ruta = `${config.filedb.pathdb}/productos.json`;
        ProductosDAOFile.instancia = this
    }

    async listar(id) {
        const objs = await this.listarAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            const todos = await JSON.parse(objs)
            return todos
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Productos.', error);
            logger.error(cuserr);
            return []
        } finally {
            logger.info(`Elementos listados Productos.`);
        }

    }

    async guardar(obj) {
        const objs = await this.listarAll();
        const id = objs.length + 1
        const newObj = {
            ...obj,
            id: id
        }
        objs.push(newObj)

        try {
            fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newObj.id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${elemento}`);
        }
    }

    async actualizar(elem) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(id) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

module.exports = ProductosDAOFile;