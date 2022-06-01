const MensajesDAOFactory = require("../classes/MensajeDAOFactory.class")
const MensajeDTO = require("../classes/MensajeDTO.class.js")
const logger = require("../loggers/logger")
const config = require("../config/config")

const DAO = MensajesDAOFactory.get()

async function listarAll() {
    let msjs = await DAO.listarAll()
    let msjDTOs = msjs.map(o => {
        if (config.srv.persistencia === 'mongodb')
            return new MensajeDTO(o.author, o.text, o.date, o._id);
        else return new MensajeDTO(o.author, o.text, o.date, o.id);
    })
    return await msjDTOs
}

async function guardar(msj) {
    await DAO.guardar(msj)
}

module.exports = {
    listarAll,
    guardar
}