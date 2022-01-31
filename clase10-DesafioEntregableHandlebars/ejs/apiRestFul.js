const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

//creo instancias del Router
const productosRouter = Router()

//Directorio donde se almacenaran las plantillas
app.set('views', './views');

//Indico el motor de las plantillas a utilizar ejs
app.set('view engine', 'ejs');

// contenedor
const Contenedor = require('./src/ContenedorProductos')
const productosApi = new Contenedor()

//Endpoints
//**********

//Ingreso de datos en formulario en la ruta raiz
app.get('/', (req, res) => {
    const productos = productosApi.getAll()
    res.render('pages/indexFormulario', { productos });
})

//PRODUCTOS ROUTERS
//=================

//Muestro los productos en pantalla
productosRouter.get('/', (req, res) => {
    const productos = productosApi.getAll()
    res.render('pages/indexVistaProductos', { productos } );
})

//Devuelvo un producto según su id
productosRouter.get('/:id', (req, res, next) => {
    const buscado = productosApi.getById(req.params.id)
    if (!buscado) next({ error: 'Producto no encontrado.' })
    res.send( buscado );
})

//Recibo y agrego un producto y lo devuelvo con el id asignado
productosRouter.post('/', (req, res) => {
    const newProduct = productosApi.save(req.body)
    console.log(newProduct)
    res.redirect('/');
})

//Recibo y actualizo un producto segun su id
productosRouter.put('/:id', (req, res) => {
    const nuevaLista = productosApi.modifyById(req.body)
    if (nuevaLista == undefined) {
        return res.status(404).send({ error: 'Producto no encontrado.' })
    }
    else listaProductos = nuevaLista
    res.send({status: 'OK'})
})

//Recibo y elimino un producto segun su id
productosRouter.delete('/:id', (req, res) => {
    const nuevaLista = productosApi.deleteById(req.body.id)
    if (nuevaLista == undefined) {
        return res.status(404).send({ error: 'Producto no encontrado.' })
    }
    else listaProductos = nuevaLista
    res.send({status: 'OK'})
})

//creo un middleware (un enrutamiento)
app.use('/productos', productosRouter)  


//middleware para manejo de errores
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err)
})

const PORT = 8080
const server = app.listen(8080, () => { 
    console.log(`API RESTfull ready por: ${server.address().port}`) } )

server.on('error', error => console.log(`Error en servidor ${error}`))