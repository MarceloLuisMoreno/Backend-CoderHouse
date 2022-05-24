const express = require("express")
const session = require("express-session")
const app = express()
const {
	Server: HttpServer
} = require("http")
const httpServer = new HttpServer(app)
const path = require("path");
const exphbs = require("express-handlebars")
const MongoStore = require("connect-mongo")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const passport = require("passport")
const parseArgs = require("minimist")
const cluster = require('cluster');
const logger = require('./src/loggers/logger')

// Middlewares
const middlewares = require('./src/utils/middlewares')

// número de CPUs
const numCPUs = require('os').cpus().length

// cargo las configuraciones del sistema de .ENV
const config = require("./src/utils/config")

/* Recibo argumentos usando MINIMIST para el puerto PORT, en el caso de no recibirlo tomo por defecto el puerto DEFINIDO EN ENV */
const options = {
	default: {
		port: config.PORT,
		modo: config.MODO
	}
}
const args = parseArgs(process.argv.slice(2), options)
const port = parseInt(args.port)
const modo = (args.modo).toUpperCase()

// Enrutamiento
const productosRouter = require('./src/routers/productos')
const carritoRouter = require('./src/routers/carrito')
const usuariosRouter = require('./src/routers/usuarios')
const autenticacionRouter = require('./src/routers/web/autenticacionRouter')

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
app.use(bodyParser.urlencoded({
	extended: true
}));

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


const {
	parse
} = require("path");
const {
	process_params
} = require("express/lib/router");


// Middleware a nivel app para capturar todas las request con loggers.info
app.use((req, res, next) => {
	logger.info(`Ruta: ${req.path}, Método: ${req.method}`)
	next()
})


//Enrutamiento API
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)
app.use('/api/usuarios', usuariosRouter)
//Enrutamiento Web
app.use('', autenticacionRouter)

app.use(middlewares.errorHandler)
app.use(middlewares.ruteNotFound)

//Servidor

if (modo === 'CLUSTER') {
	//modo CLUSTER
	if (cluster.isMaster) {
		logger.info(`Número de CPU: ${numCPUs}`)
		logger.info(`PID MASTER ${process.pid}`)

		for (let i = 0; i < numCPUs; i++) {
			cluster.fork()
		}

		cluster.on('exit', worker => {
			logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
			cluster.fork()
		})
	} else {
		const connectedServer = httpServer.listen(port, function () {
			logger.info(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}, modo: ${modo} - PID: ${process.pid}`)
		})
		connectedServer.on('error', error => logger.error(`Error en servidor: ${error}`))
	}
} else {
	//modo FORK por defecto
	const connectedServer = httpServer.listen(port, function () {
		logger.info(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}, modo: ${modo} - PID: ${process.pid}`)
	})
	connectedServer.on('error', error => logger.error(`Error en servidor: ${error}`))
	process.on('exit', (code) => {
		logger.info('Exit code -> ', code)
	})
}