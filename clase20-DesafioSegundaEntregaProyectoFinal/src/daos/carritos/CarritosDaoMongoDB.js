const {
    mongoose,
    Schema,
    model
} = require('mongoose')

const config = require('../../../config.js')
const URL = config.mongoLocal.cnxStr


mongoose.connect(URL)
    .then(console.log('Base de datos Mongoose conectada'))
    .catch((error) => {
        console.log(`Error: ${error}`)
    })

const carritosCollection = 'carrito'
const CarritoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    productos: [{
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
        foto: {
            type: String,
            required: true
        },
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