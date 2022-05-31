const logger = require('../loggers/logger')
const config = require('../config/config')
//Variable booleana administrador
const administrador = config.administrador

const isAdmin = (req, res, next) => {
    if (!administrador) {
        logger.warn(`Error -1 - Ruta ${req.originalUrl}, Método: ${req.method} no autorizado, sólo administrador.`)
        return res.status(403).json({
            error: -1,
            message: `Ruta ${req.originalUrl}, Método: ${req.method} no autorizado, sólo administrador.`
        });
    } else {
        return next();
    }
}

const errorHandler = (error, req, res, next) => {

    return res.status(400).json({
        error: 400,
        descripcion: error.message
    });
}

const ruteNotFound = (req, res, next) => {
    logger.warn(`Error -2 - Ruta ${req.url}, Método ${req.method} no implementado.`)
    return res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url}, Método ${req.method} no implementado.`
    });
}

module.exports = {
    isAdmin,
    errorHandler,
    ruteNotFound,
};