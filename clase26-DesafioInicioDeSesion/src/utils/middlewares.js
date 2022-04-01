//Variable booleana administrador
const administrador = Boolean(true)

const isAdmin = (req, res, next) => {
    if (!administrador) {
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