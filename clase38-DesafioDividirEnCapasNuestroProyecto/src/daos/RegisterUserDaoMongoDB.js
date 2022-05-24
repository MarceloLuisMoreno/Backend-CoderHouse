const {
	mongoose,
	Schema,
	model
} = require('mongoose')

const usersCollection = 'user'
const UsersSchema = new Schema({
	timestamp: {
		type: String,
		required: true
	},
	nombre: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})


const userModel = model(usersCollection, UsersSchema)

const ContenedorMongo = require("../contenedores/ContenedorMongoDB")
const usersDAO = new ContenedorMongo(userModel)

module.exports = usersDAO