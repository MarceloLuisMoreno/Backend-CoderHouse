const express = require("express")
const session = require("express-session")
const path = require("path");
const exphbs = require("express-handlebars")
const MongoStore = require("connect-mongo")
const cookieParser = require('cookie-parser')
const passport = require("passport")
const parseArgs = require("minimist")
const cluster = require('cluster');
const logger = require('./src/loggers/logger')


// número de CPUs
const numCPUs = require('os').cpus().length

// cargo las configuraciones del sistema de .ENV
const config = require("./src/config")

/* Recibo argumentos usando MINIMIST para el puerto PORT, en el caso de no recibirlo tomo por defecto el puerto 8080 */
const options = {
	default: {
		port: '8080',
		modo: 'FORK'
	}
}
const args = parseArgs(process.argv.slice(2), options)
const port = parseInt(args.port)
const modo = (args.modo).toUpperCase()

const {
	Server: HttpServer
} = require("http")
// ****** TP WebSockets
const {
	Server: IOServer
} = require("socket.io")


const app = express()
const httpServer = new HttpServer(app) //levanta la aplicacion al server - creo un servidor y el constructor de esta clase me pide la app
const io = new IOServer(httpServer) //se base en la aplicacion levantada por el server = le paso el servidor sobre el que se va ha trabajar.

const productosRouter = require('./src/routes/productos.Routes')
const productosTestRouter = require('./src/routes/productos.TestRoutes')
const autenticacionRouter = require('./src/routes/web/autenticacionRoutes')
const homeRouter = require('./src/routes/web/homeRoutes')
const normalizar = require('./src/normalizacion/normalizrMessages')

const middlewares = require('./src/middlewares/middlewares')

app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))
// Espacio público del servidor
app.use(express.static("public"))

// Motor de plantillas 
app.set('views', path.join(path.dirname(''), './public/views'))
app.engine('.hbs', exphbs.engine({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Session Setup
app.use(cookieParser());
app.use(session({
	store: MongoStore.create({
		mongoUrl: config.mongoRemote.cnxStr
	}),
	secret: config.mongoRemote.clave,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 60000
	}
}))

app.use(passport.initialize());
app.use(passport.session());


//Defino las bases de datos con las que voy a trabajar
const {
	knexMySQL
} = require('./options/dbMySQL')
const {
	knexSqlite
} = require('./options/SQLite3')


// Clase contenedor: creo una instancia para productos y otra para mensajes. Uso el mismo contenedor para ambas bases de datos.
const ContenedorSql = require('./src/contenedores/ContenedorSQL')
const ContenedorArchivo = require('./src/contenedores/ContenedorArchivo')
const {
	parse
} = require("path");
const {
	process_params
} = require("express/lib/router");

const contenedorProductos = new ContenedorSql(knexMySQL, 'products')
const contenedorMessages = new ContenedorArchivo('./public/data/messages.json')


// Servidor

const webSocket = require('./src/routes/websockets/sockets')
const onConnection = (socket) => {
	webSocket(io, socket)
}
io.on('connection', onConnection)

/* io.on('connection', async socket => {

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
	let messagesNormalizr = normalizar.normalizarMensajes(messages)
	socket.emit('messages', messagesNormalizr)


	// Escucho los mensajes enviados por el cliente y se los propago a todos
	socket.on('newMessage', async message => {
		await contenedorMessages.saveAll(message)
		let messages = await contenedorMessages.getAll()
		let messagesNormalizr = normalizar.normalizarMensajes(messages)
		io.sockets.emit('messages', messagesNormalizr)
	})
})
 */
//Enrutamiento API
app.use('/api/productos', productosRouter)
app.use('/api/productos-test', productosTestRouter)

//Middleware a nivel app para capturar todas las request con loggers.info
app.use((req, res, next) => {
	logger.info(`Ruta: ${req.path}, Método: ${req.method}`)
	next()
})

//Enrutamiento Web
app.use('', autenticacionRouter)
app.use('', homeRouter)

app.use(middlewares.errorHandler)
app.use(middlewares.ruteNotFound)

//Servidor

if (modo === 'CLUSTER') {
	//modo CLUSTER
	if (cluster.isMaster) {
		console.log(`Número de CPU: ${numCPUs}`)
		console.log(`PID MASTER ${process.pid}`)

		for (let i = 0; i < numCPUs; i++) {
			cluster.fork()
		}

		cluster.on('exit', worker => {
			console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
			cluster.fork()
		})
	} else {
		const connectedServer = httpServer.listen(port, function () {
			console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}, modo: ${modo} - PID: ${process.pid}`)
		})
		connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))
	}
} else {
	//modo FORK por defecto
	const connectedServer = httpServer.listen(port, function () {
		console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}, modo: ${modo} - PID: ${process.pid}`)
	})
	connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))
	process.on('exit', (code) => {
		console.log('Exit code -> ', code)
	})
}