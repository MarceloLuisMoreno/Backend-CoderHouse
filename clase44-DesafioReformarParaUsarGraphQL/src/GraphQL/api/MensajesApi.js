const config = require("../../config/config")
const Mensaje = require('../models/Mensajes.js')

let MensajesDao
switch (config.srv.persistencia) {
    case 'mongodb':
        MensajesDao = require('../daos/MensajesDaoMongoDB')
        break
    case 'file':
        MensajesDao = require('../daos/MensajesDaoFile')
        break
    default:
        MensajesDao = require('../daos/MensajesDaoMem')
        break
}

module.exports = class MensajesApi {
    constructor() {
        this.dao = new MensajesDao()
    }

    listarMensajes = () => {
        return this.dao.listarMensajes()
    }

    nuevoMensaje = async ({
        datos
    }) => {
        const objs = await this.dao.listarMensajes();
        const mensajes = Object.values(objs)
        let id = mensajes.length + 1
        const nuevoMensaje = new Mensaje(id, datos)
        this.dao.saveMensaje(nuevoMensaje)
        return nuevoMensaje
    }

}