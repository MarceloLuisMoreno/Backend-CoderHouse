// app.js
const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

// Set up body parsing middleware
app.use(koaBody())

// Require the Router we defined in productos.js
const productos = require('./src/routes/productos.RoutesKoa')

// Use the Router on the sub route /productos
app.use(productos.routes(), productos.allowedMethods())
app.use(async ctx => {
  return (
    ctx.body = {
      status: 'error',
      message: 'Ruta no encontrada.'
    }
  )
});

// Capturamos cualquier error
app.on('error', e => {
  console.log('Error centralizado: ', e);
})

// Server listen
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log('Error en Servidor Koa:', error))