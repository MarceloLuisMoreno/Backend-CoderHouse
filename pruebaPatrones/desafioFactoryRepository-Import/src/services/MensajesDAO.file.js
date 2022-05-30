/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";
import {
    promises as fs
} from 'fs'
import config from "../utils/config.js";
import DAO from "./DAO.class.js";

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

export default MensajesDAOFile;