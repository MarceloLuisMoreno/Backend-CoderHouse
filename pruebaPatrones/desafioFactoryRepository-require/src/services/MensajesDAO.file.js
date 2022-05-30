/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../Classes/CustomError.class.js")
const logger = require("../utils/loggers.js")
const fs = require('fs')
const config = require("../utils/config.js")
const DAO = require("./DAO.class.js")

class MensajesDAOFile extends DAO {
    constructor(ruta) {
        super();
        this.ruta = `${config.filedb.pathdb}/mensajes.json`;
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async guardar(obj) {
        const objs = await this.listarAll();
        let newId = objs.length + 1
        const newObj = {
            ...obj,
            id: newId
        };
        lista.push(newObj);
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

}

module.exports = MensajesDAOFile;