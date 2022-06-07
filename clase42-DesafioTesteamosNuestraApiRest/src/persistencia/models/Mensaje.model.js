const mongoose = require("mongoose")

const MensajeSchema = mongoose.Schema({
    author: {
        mail: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const MensajeModel = mongoose.model('mensajes', MensajeSchema);

module.exports = MensajeModel;