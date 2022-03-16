const Schema = require("mongoose")


const ProductoSchema = new Schema({
    id: {
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
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: Number,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }})

    module.exports = {
        ProductoSchema
    }

