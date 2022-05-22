//Variable booleana administrador
const administrador = Boolean(false)
const logger= require('../loggers/logger')

const isAdmin = (req, res, next) => {
    if (!administrador) {
        const messageError = `Ruta ${req.originalUrl}, Método: ${req.method} no autorizado, sólo administrador.`
        logger.info(messageError);
        return res.status(403).json({
            error: -1,
            message: messageError
        });
    } else {
        return next();
    }
}

const errorHandler = (error, req, res, next) => {
    logger.error("ERROR!!!!!!", error.message);
    return res.status(400).json({
        error: 400,
        descripcion: error.message
    });
}

const ruteNotFound = (req, res, next) => {
    return res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url}, Método ${req.method} no implementado.`
    });
}

/* function authenticated */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}


module.exports = {
    isAdmin,
    errorHandler,
    ruteNotFound,
    isAuth
};