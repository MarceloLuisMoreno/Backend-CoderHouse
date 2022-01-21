const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//creo instancias del Router
const productos = Router()

// contenedor
const Contenedor = require('./ContenedorProductos.js')

//solicito ingreso de producto
function ingresoProducto(req, res, next) {
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    req.body.title = title
    req.body.price = price
    req.body.thumbnail = thumbnail
    next()
}

//Creo array como soporte de persistencia de productos en memoria
let listaProductos = []

//Endpoints
//**********

//Devuelvo todos los productos
productos.get('/', (req, res) => {
    res.send(listaProductos)
})

//Devuelvo un producto según su id
productos.get('/:id', (req, res, next) => {
    const idBuscado = req.params.id
    const contenedor = new Contenedor(listaProductos)
    const buscado = contenedor.getById(idBuscado)
    if (!buscado) next({ error: 'Producto no encontrado.' })
    res.send(buscado)
})

//Recibo y agrego un producto y lo devuelvo con el id asignado
productos.post('/', ingresoProducto, (req, res) => {
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const contenedor = new Contenedor(listaProductos)
    listaProductos = contenedor.save(title, price, thumbnail)
    res.send(listaProductos)
})

//Recibo y actualizo un producto segun su id
productos.put('/:id', (req, res) => {
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const id = req.body.id
    const contenedor = new Contenedor(listaProductos)
    const nuevaLista = contenedor.modifyById(id, title, price, thumbnail)
    if (nuevaLista == undefined) {
        return res.status(404).send({ error: 'Producto no encontrado.' })
    }
    else listaProductos = nuevaLista
    res.send()
})

//Recibo y elimino un producto segun su id
productos.delete('/:id', (req, res) => {
    const idBuscado = req.body.id
    const contenedor = new Contenedor(listaProductos)
    const nuevaLista = contenedor.deleteById(idBuscado)
    if (nuevaLista == undefined) {
        return res.status(404).send({ error: 'Producto no encontrado.' })
    }
    else listaProductos = nuevaLista
    res.send()
})

//creo un middleware (un enrutamiento)
app.use('/api/productos', productos)  

app.use('/static', express.static(__dirname + '/public'))

//middleware para manejo de errores
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err)
})

app.listen(8080)
