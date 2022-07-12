const UsuariosDAOFactory = require("../persistencia/DAOs/UsuarioDAOFactory.class")
const DAOusr = UsuariosDAOFactory.get()
const mensajeria = require('../utils/mensajeria')

const logger = require("../loggers/logger")

async function listar(req, res) {
    try {
        const email = req.params.id
        let usuario = await DAOusr.listar(email)
        if (!usuario || usuario.length < 1) {
            const err = `Error, no se encontró al Usuario : ${email}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            res.status(200).json(usuario);
        }
    } catch (error) {
        logger.warn(`Error al listar un Usuario: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function guardar(req, res) {
    try {
        const usuario = req.body
        const newTimestamp = new Date()
        const timestamp = newTimestamp.toLocaleString()
        const nuevoUsuario = {
            ...usuario,
            timestamp
        };
        const saveId = await DAOusr.guardar(nuevoUsuario);
        mensajeria.gmailNuevo(nuevoUsuario)
        const info = 'Usuario creado con éxito.'
        logger.info(info)
        return res.status(201).json({
            message: info
        });
    } catch (error) {
        logger.warn(`Error al guardar: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

module.exports = {
    listar,
    guardar
}