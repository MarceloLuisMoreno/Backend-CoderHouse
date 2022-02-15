const express = require("express")
const app = express()
const {
	Server: HttpServer
} = require("http")
const httpServer = new HttpServer(app)
const productosRouter = require('./src/routers/productos')
const carritoRouter = require('./src/routers/carrito')

app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

// Espacio público del servidor
app.use(express.static("public"))


//Enrutamiento
app.use('/api/productos', productosRouter)

app.use('/api/carrito', carritoRouter)

app.use('/static', express.static(__dirname + '/public'))

//Para detectar las rutas y métodos no implementados
app.all(/.*$/, function (req, res) {
	res.send({
		error: -2,
		descripcion: `ruta ${req.path}, Método: ${req.method} no implementado.`
	});
});

const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
	console.log(`Servidor HTTP Trabajo Final escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))