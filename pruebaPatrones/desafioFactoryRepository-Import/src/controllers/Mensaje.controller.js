import MensajesDAOFile from "../services/MensajesDAO.file.js";
import MensajeDTO from "../classes/MensajeDTO.class.js";
import config from "../utils/config.js";
import MensajesDAOMem from "../services/MensajesDAO.mem.js";
import MensajesDAOMongoDB from "../services/MensajesDAO.mongodb.js";

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

export default MensajeController;