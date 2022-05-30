const mongoose = require("mongoose")

const ProductoSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
});

const ProductoModel = mongoose.model('productos', ProductoSchema);

module.exports = ProductoModel;