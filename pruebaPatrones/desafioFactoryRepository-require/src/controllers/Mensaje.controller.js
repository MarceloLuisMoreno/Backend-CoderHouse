const MensajesDAOFile = require("../services/MensajesDAO.file.js")
const MensajeDTO = require("../classes/MensajeDTO.class.js")
const config = require("../utils/config.js")
const MensajesDAOMem = require("../services/MensajesDAO.mem.js")
const MensajesDAOMongoDB = require("../services/MensajesDAO.mongodb.js")

let msjDAO = null;

switch (config.srv.persistencia) {
    case 'mongodb':
        msjDAO = new MensajesDAOMongoDB();
        break;
    case 'file':
        msjDAO = new MensajesDAOFile();
        break;
    case 'memoria':
        msjDAO = new MensajesDAOMem();
        break;
    default:
        break;
}

const MensajeController = {
    async listarAll() {
        let msjs = await msjDAO.listarAll();
        let msjDTOs = msjs.map(o => {
            return new MensajeDTO(o.author, o.text, o.date, o.id);
        })
        return msjDTOs;
    },

    async guardar(msj) {
        await msjDAO.guardar(msj);
    }
}

module.exports = MensajeController;