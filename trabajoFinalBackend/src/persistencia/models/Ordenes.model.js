const mongoose = require("mongoose")

const OrdenesSchema = mongoose.Schema({
    numeroOrden: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    estadoOrden: {
        type: String,
        required: true
    },
    productos: [{
        title: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

const OrdenesModel = mongoose.model('ordenes', OrdenesSchema);

module.exports = OrdenesModel;