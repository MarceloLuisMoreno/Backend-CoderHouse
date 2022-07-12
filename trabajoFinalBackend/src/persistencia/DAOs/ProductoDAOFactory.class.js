const config = require("../../config/config")
const ProductosDAOMongoDB = require("../DAOs/productos/ProductosDAO.mongodb.js")

class ProductosDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'mongodb':
                return new ProductosDAOMongoDB();
            default:
                return new ProductosDAOMongoDB();
        }
    }
}

module.exports = ProductosDAOFactory;