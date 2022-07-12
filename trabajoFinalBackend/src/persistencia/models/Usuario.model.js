const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UsuarioModel = mongoose.model('users', UsuarioSchema)

module.exports = UsuarioModel