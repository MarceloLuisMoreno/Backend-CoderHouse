const config = require("../config/config")
const ProductosDAOFile = require("../services/ProductosDAO.file.js")
const ProductosDAOMem = require("../services/ProductosDAO.mem.js")
const ProductosDAOMongoDB = require("../services/ProductosDAO.mongodb.js")

class ProductosDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongodb':
                return new ProductosDAOMongoDB();
                break;
            case 'file':
                return new ProductosDAOFile();
                break;
            default:
                return new ProductosDAOMem();
                break;
        }
    }
}

module.exports = ProductosDAOFactory;