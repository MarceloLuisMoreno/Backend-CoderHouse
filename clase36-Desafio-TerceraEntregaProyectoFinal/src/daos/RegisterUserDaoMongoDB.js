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
	nombre: {
		type: String,
		required: true
	},
	direccion: {
		type: String,
		required: true
	},
	edad: {
		type: Number,
		required: true
	},
	celular: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})


const userModel = model(usersCollection, UsersSchema)

const ContenedorMongo = require("../contenedores/ContenedorMongoDBuser")
const usersDAO = new ContenedorMongo(userModel)

module.exports = usersDAO