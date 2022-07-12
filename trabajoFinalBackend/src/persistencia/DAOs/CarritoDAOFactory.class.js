const config = require("../../config/config")
const CarritosDAOMongoDB = require("./Carritos/CarritosDAO.mongodb.js")

class CarritosDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongodb':
                return new CarritosDAOMongoDB();
                /*             case 'file':
                                return new CarritosDAOFile();
                            default:
                                return new CarritosDAOMem();
                 */
            default:
                return new CarritosDAOMongoDB();
        }
    }
}

module.exports = CarritosDAOFactory;