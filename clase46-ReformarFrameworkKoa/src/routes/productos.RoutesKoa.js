// productos.js
const Router = require('koa-router')

// Prefix all routes with /api/productos
const router = new Router({
  prefix: '/api/productos',
})

const ProductoController = require("../controllers/Producto.controller.js")
const productos = ProductoController



/* ---------------------- Routes ----------------------- */
/* API REST Get All */
router.get('/', async ctx => {
  const prod = await productos.listarAll()
  ctx.body = {
    status: 'success',
    message: prod,
  }
})

/* API REST Get x ID */
router.get('/:id', async ctx => {
  try {
    const getCurrentProduc = await productos.listar(ctx.params.id)
    ctx.body = getCurrentProduc
  } catch (error) {
    ctx.response.status = 404
    ctx.body = {
      status: 'error!',
      message: `Product Not Found with that id: ${ctx.params.id}`,
    }
  }
})

/* API REST Post */
router.post('/', async ctx => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.title ||
    !ctx.request.body.price ||
    !ctx.request.body.thumbnail
  ) {
    ctx.response.status = 400
    ctx.body = {
      status: 'error',
      message: 'Please enter the data',
    }
  } else {
    const newProd = await productos.guardar(ctx.request.body)
    ctx.response.status = 201
    ctx.body = {
      status: 'success',
      message: `New Product added with id: ${newProd} & title: ${ctx.request.body.title}`,
    }
  }
})

/* API REST Put */
router.put('/:id', async ctx => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.title ||
    !ctx.request.body.price ||
    !ctx.request.body.thumbnail
  ) {
    ctx.response.status = 400
    ctx.body = {
      status: 'error',
      message: 'Please enter the data',
    }
  } else {
    try {
      const actualizo = await productos.actualizar(ctx.request.body.id, ctx.request.body)
      ctx.response.status = 201
      ctx.body = {
        status: 'success',
        message: `New Product updated with id: ${ctx.request.body.id} & title: ${ctx.request.body.title}`,
      }
    } catch (error) {
      ctx.response.status = 400
      ctx.body = {
        status: 'error',
        message: `Product not found with id: ${ctx.request.body.id}`,
      }
    }
  }
})

/* API REST Delete */
router.delete('/:id', async ctx => {
  try {
    await productos.borrar(ctx.params.id)
    ctx.response.status = 200
    ctx.body = {
      status: 'success',
      message: `Product deleted with id: ${ctx.params.id}`,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      status: 'error',
      message: `Product not found with id: ${ctx.params.id}`,
    }
  }
})

module.exports = router