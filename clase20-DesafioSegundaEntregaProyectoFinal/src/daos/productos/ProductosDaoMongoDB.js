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

const productosCollection = 'productos'
const ProductoSchema = new Schema({
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
})


const productModel = model(productosCollection, ProductoSchema)

const ContenedorMongo = require("../../contenedores/ContenedorMongoDB")
const productsDAO = new ContenedorMongo(productModel)

module.exports = productsDAO