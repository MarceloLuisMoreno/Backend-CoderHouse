const CustomError = require("../../classes/CustomError.class")

const {
    promises: fs
} = require('fs')


module.exports = class MensajesDao {
    constructor() {
        this.ruta = './DB/mensajes.json'
    }

    async listarMensajes() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            const todos = await JSON.parse(objs)
            return todos
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Mensajes.', error);
            return []
        }
    }

    async saveMensaje(obj) {
        const objs = await this.listarMensajes();
        objs.push(obj)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return obj.id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            throw cuserr;
        }
    }

}