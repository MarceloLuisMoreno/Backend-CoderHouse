const express = require("express")
const app = express()
const {
	Server: HttpServer
} = require("http")
const httpServer = new HttpServer(app)
const middlewares = require('./src/middlewares')
const PORT = 8080 || process.env.PORT

const productosRouter = require('./src/routers/productos')
const carritoRouter = require('./src/routers/carrito')

app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// Espacio público del servidor
app.use(express.static("public"))


//Enrutamiento
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)


app.use(middlewares.errorHandler)
app.use(middlewares.ruteNotFound)


const connectedServer = httpServer.listen(PORT, function () {
	console.log(`Servidor HTTP Trabajo Final escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))