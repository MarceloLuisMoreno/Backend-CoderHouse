const config = require("../config/config")
const MensajesDAOFile = require("../services/MensajesDAO.file.js")
const MensajeDTO = require("../classes/MensajeDTO.class.js")
const MensajesDAOMem = require("../services/MensajesDAO.mem.js")
const MensajesDAOMongoDB = require("../services/MensajesDAO.mongodb.js")
const logger = require("../loggers/logger")

let msjDAO
switch (config.srv.persistencia) {
    case 'mongodb':
        msjDAO = new MensajesDAOMongoDB();
        break;
    case 'file':
        msjDAO = new MensajesDAOFile();
        break;
    default:
        msjDAO = new MensajesDAOMem();
        break;
}


async function listarAll() {
    let msjs = await msjDAO.listarAll()
    let msjDTOs = msjs.map(o => {
        return new MensajeDTO(o.author, o.text, o.date, o._id);
    })
    return await msjDTOs
}

async function guardar(msj) {
    await msjDAO.guardar(msj)
}

module.exports = {
    listarAll,
    guardar
}