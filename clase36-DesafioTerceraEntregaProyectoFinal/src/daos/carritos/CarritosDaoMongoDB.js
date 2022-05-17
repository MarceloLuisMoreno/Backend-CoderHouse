const {
    mongoose,
    Schema,
    model
} = require('mongoose')

const carritosCollection = 'carts'
const CarritoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    cliente : {
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
            required: true
        },
        foto: { type: String },
        precio: {
            type: Number,
            required: true,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        }
    }]
})


const cartModel = model(carritosCollection, CarritoSchema)

const ContenedorMongo = require("../../contenedores/ContenedorMongoDB")
const cartDAO = new ContenedorMongo(cartModel)

module.exports = cartDAO