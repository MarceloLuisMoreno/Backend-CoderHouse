const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//creo instancias del Router
const productosRouter = Router()

// contenedor
const Contenedor = require('./src/ContenedorProductos.js')
const productosApi = new Contenedor()

//Endpoints
//**********

//Devuelvo todos los productos
productosRouter.get('/', (req, res) => {
    res.send(contenedor.getAll())
})

//Devuelvo un producto según su id
productosRouter.get('/:id', (req, res, next) => {
    const buscado = productosApi.getById(req.params.id)
    if (!buscado) next({ error: 'Producto no encontrado.' })
    res.send(buscado)
})

//Recibo y agrego un producto y lo devuelvo con el id asignado
productosRouter.post('/', (req, res) => {
    const newProduct = productosApi.save(req.body)
    res.send(newProduct)
})

//Recibo y actualizo un producto segun su id
productosRouter.put('/:id', (req, res) => {
    const nuevaLista = productosApi.modifyById(req.body)
    if (nuevaLista == undefined) return res.status(404).send({ error: 'Producto no encontrado.' })
    else listaProductos = nuevaLista
    res.send({status: 'OK'})
})

//Recibo y elimino un producto segun su id
productosRouter.delete('/:id', (req, res) => {
    const nuevaLista = productosApi.deleteById(req.body.id)
    if (nuevaLista == undefined) return res.status(404).send({ error: 'Producto no encontrado.' })
    else listaProductos = nuevaLista
    res.send({status: 'OK'})
})

//creo un middleware (un enrutamiento)
app.use('/api/productos', productosRouter)  

app.use('/static', express.static(__dirname + '/public'))

//middleware para manejo de errores
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err)
})

const PORT = 8080
const server = app.listen(8080, () => { 
    console.log(`API RESTfull ready por: ${server.address().port}`) } )

server.on('error', error => console.log(`Error en servidor ${error}`))
