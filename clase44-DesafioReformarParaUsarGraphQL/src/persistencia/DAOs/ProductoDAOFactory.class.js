const config = require("../../config/config")
const ProductosDAOFile = require("../DAOs/products/ProductosDAO.file.js")
const ProductosDAOMem = require("../DAOs/products/ProductosDAO.mem.js")
const ProductosDAOMongoDB = require("../DAOs/products/ProductosDAO.mongodb.js")

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