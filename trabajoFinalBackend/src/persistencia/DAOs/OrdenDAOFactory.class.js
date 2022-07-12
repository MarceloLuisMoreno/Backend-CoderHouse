const config = require("../../config/config")
const OrdenesDAOMongoDB = require("./ordenesCompra/OrdenesDAO.mongodb.js")

class OrdenesDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongodb':
                return new OrdenesDAOMongoDB();
            default:
                return new OrdenesDAOMongoDB();
        }
    }
}

module.exports = OrdenesDAOFactory;