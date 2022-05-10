const {
	mongoose,
	Schema,
	model
} = require('mongoose')

const productsCollection = 'products'
const ProductsSchema = new Schema({
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
})


const productModel = model(productsCollection, ProductsSchema)

const ContenedorMongo = require("../contenedores/ContenedorMongoDB")
const productsDAO = new ContenedorMongo(productModel)

module.exports = productsDAO