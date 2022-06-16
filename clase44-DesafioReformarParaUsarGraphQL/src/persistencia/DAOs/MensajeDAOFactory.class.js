const config = require("../../config/config")
const MensajesDAOFile = require("../DAOs/messages/MensajesDAO.file.js")
const MensajesDAOMem = require("../DAOs/messages/MensajesDAO.mem.js")
const MensajesDAOMongoDB = require("../DAOs/messages/MensajesDAO.mongodb.js")

class MensajesDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongodb':
                return new MensajesDAOMongoDB();
                break;
            case 'file':
                return new MensajesDAOFile();
                break;
            default:
                return new MensajesDAOMem();
                break;
        }
    }
}

module.exports = MensajesDAOFactory;