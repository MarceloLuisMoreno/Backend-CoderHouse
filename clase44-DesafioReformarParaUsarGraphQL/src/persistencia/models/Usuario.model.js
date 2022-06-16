const mongoose = require("mongoose")

const UsuarioSchema = mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UsuarioModel = mongoose.model('user', UsuarioSchema);

const UsuarioMongo = require('../../services/Usuarios.MongoDB')
const userDAO = new UsuarioMongo(UsuarioModel)
module.exports = userDAO;