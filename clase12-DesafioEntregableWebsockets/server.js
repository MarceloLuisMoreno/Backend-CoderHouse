const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app) //levanta la aplicacion al server - creo un servidor y el constructor de esta clase me pide la app
const io = new IOServer(httpServer) //se base en la aplicacion levantada por el server = le paso el servidor sobre el que se va ha trabajar.

// Espacio público del servidor
app.use(express.static("public"))


// Clase contenedor: creo una instancia para productos y otra para mensajes. Uso el mismo contenedor para ambos archivos.
const Contenedor = require('./src/Contenedor')
const contenedorProductos = new Contenedor('./public/data/products.json')
const contenedorMessages = new Contenedor('./public/data/messages.json')

// Servidor
io.on('connection', async socket => {
	console.log('Un Cliente se ha Conectado!')

	//*****PRODUCTOS******
	// Envío los productos al cliente que se conecto
	let products = await contenedorProductos.getAll()
	socket.emit('products', products)

	// Escucho los cambios en productos (uso async por los métodos asincrónicos de la clase Contenedor) y los propago a todos
	socket.on('newProduct', async product => {
		await contenedorProductos.saveProduct(product)
		let products = await contenedorProductos.getAll()
		io.sockets.emit('products', products)
	})

	//*****MENSAJES*****
	//Envío la lista de mensajes guardados al Cliente
	let messages = await contenedorMessages.getAll();
	socket.emit('messages', messages)

	// Escucho los mensajes enviados por el cliente (uso async por los métodos asincrónicos de la clase Contenedor) y se los propago a todos
	socket.on('newMessage', async message => {
		await contenedorMessages.saveProduct(message)
		let messages = await contenedorMessages.getAll()
		io.sockets.emit('messages', messages)
	})

})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
	console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))
