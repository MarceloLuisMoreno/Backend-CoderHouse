// Api Usuarios
config = require('../utils/config')

let usuariosDAO= require('../daos/RegisterUserDaoMongoDB')


const getUsuario = async (req, res, next) => {
    try {
        const email = req.params.email
        const usuario = await usuariosDAO.getById(email)
            .then((resolve) => resolve)
        if (!usuario) {
            throw new Error("Usuario no encontrado.")
        }
        res.json(usuario)
    } catch (error) {
        next(error)
    }
}

const saveUsuario = async (req, res, next) => {
    try {
        const newUsuario = req.body
        const saveId = await usuariosDAO.saveElement(newUsuario)
            .then(res => res)
        await res.json(`El Usuario se agrego con éxito. Id: ${saveId}`)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUsuario,
    saveUsuario,
}