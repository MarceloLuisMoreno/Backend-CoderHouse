const mongoose = require("mongoose")

const CarritoSchema = mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    productos: [{
        id: {
            type: String,
            required: true
        },
        timestamp: {
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
    }]
});

const CarritoModel = mongoose.model('carritos', CarritoSchema);

module.exports = CarritoModel;