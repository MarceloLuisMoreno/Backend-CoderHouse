const config = require("../../config/config")
const MensajesDAOMongoDB = require("../DAOs/mensajes/MensajesDAO.mongodb.js")

class MensajesDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongoDB':
                return new MensajesDAOMongoDB();
            default:
                return new MensajesDAOMongoDB();
        }
    }
}

module.exports = MensajesDAOFactory;