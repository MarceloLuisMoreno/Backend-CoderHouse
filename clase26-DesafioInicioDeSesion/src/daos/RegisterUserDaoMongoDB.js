const {
	mongoose,
	Schema,
	model
} = require('mongoose')

const usersCollection = 'users'
const UsersSchema = new Schema({
	timestamp: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contraseña: {
		type: String,
		required: true
	}
})


const userModel = model(usersCollection, UsersSchema)

const ContenedorMongo = require("../../contenedores/ContenedorMongoDB")
const UsersDAO = new ContenedorMongo(userModel)

module.exports = productsDAO