const express = require("express")
const {
	Server: HttpServer
} = require("http")
/* TP WebSockets */
const {
	Server: IOServer
} = require("socket.io")



const app = express()
const httpServer = new HttpServer(app) //levanta la aplicacion al server - creo un servidor y el constructor de esta clase me pide la app
const io = new IOServer(httpServer) //se base en la aplicacion levantada por el server = le paso el servidor sobre el que se va ha trabajar.
const productosRouter = require('./src/routers/productosRouter')
const productosTestRouter = require('./src/routers/productosTestRouter')

//  Normalizr 
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))
// Espacio público del servidor
app.use(express.static("public"))

//Defino las bases de datos con las que voy a trabajar
const {
	knexMySQL
} = require('./options/dbMySQL');
const {
	knexSqlite
} = require('./options/SQLite3');


// Clase contenedor: creo una instancia para productos y otra para mensajes. Uso el mismo contenedor para ambas bases de datos.
const Contenedor = require('./src/Contenedor')
const ContenedorMensajes = require('./src/ContenedorMensajes')

const contenedorProductos = new Contenedor(knexMySQL, 'products')
const contenedorMessages = new ContenedorMensajes('./public/data/messages.json')

// TP Normalizr
//author
const schemaAuthor = new schema.Entity('author', {}, {
    idAttribute: 'mail'
})
// Mensaje
const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })
// Mensajes
const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })



// Servidor
io.on('connection', async socket => {
	console.log('Un Cliente se ha Conectado!')

	//*****PRODUCTOS******
	// Envío los productos al cliente que se conecto
	contenedorProductos.getAll().then(result => {
		if (result.status === "success") {
			socket.emit('products', result.payload)
		}
	})

	// Escucho los cambios en productos y los propago a todos
	socket.on('newProduct', product => {
		contenedorProductos.saveProduct(product)
			.then(result => console.log(result))
			.then(() => {
				contenedorProductos.getAll().then(result => {
					if (result.status === "success") {
						socket.emit('products', result.payload)
					}
				})
			})
	})


	//*****MENSAJES*****
	//Envío la lista de mensajes guardados al Cliente
	let messages = await contenedorMessages.getAll();
	const messagesID = {
		id: "mensajes",
		mensajes: [ messages] }
	let messagesNormalizr = normalize(messagesID, schemaMensajes)
	socket.emit('messages', messagesNormalizr)
//	socket.emit('messages', messages)


	// Escucho los mensajes enviados por el cliente (uso async por los métodos asincrónicos de la clase Contenedor) y se los propago a todos
	socket.on('newMessage', async message => {
		await contenedorMessages.saveAll(message)
		let messages = await contenedorMessages.getAll()
		const messagesID = {
			id: "mensajes",
			mensajes: [ messages] }
	
		let messagesNormalizr = normalize(messagesID, schemaMensajes)

		io.sockets.emit('messages', messagesNormalizr)
//		io.sockets.emit('messages', message)

	})
})

//Enrutamiento
app.use('/api/productos', productosRouter)

app.use('/api/productos-test', productosTestRouter)


//Para detectar las rutas y métodos no implementados
app.all(/.*$/, function (req, res) {
	res.send({
		error: -2,
		descripcion: `ruta ${req.path}, Método: ${req.method} no implementado.`
	});
});
const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
	console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))