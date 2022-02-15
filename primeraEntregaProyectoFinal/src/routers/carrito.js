const express = require("express")
const router = express.Router()

// Clase contenedor: creo una instancia para el carrito. 
const Contenedor = require('../Contenedor')
const contenedorCarrito = new Contenedor('./public/data/carrito.json')

router.get("/", async (req, res) => {
    const todos = await contenedorCarrito.getAll()
        .catch(err => next(err))
    res.send(todos)
})

router.post("/", async (req, res, next) => {
	/* POST: '/' - Crea un carrito vacío y devuelve su id. */
	const cart = {
		productos: []
	}
	const newCarrito = await contenedorCarrito.saveProduct(cart)
	res.send(newCarrito)
})

router.delete("/:id", async (req, res, next) => {
	/* DELETE: '/:id' - Vacía un carrito y lo elimina */
	const buscado = await contenedorCarrito.deleteById(req.params.id)
		.catch(err => next(err))
	if (buscado === null) return res.status(404).send({
		error: 'Carrito no encontrado.'
	})
	else
		res.send({
			status: 'OK'
		})
})

router.get("/:id/productos", async (req, res, next) => {
	/* GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito */
	try {
		const buscado = await contenedorCarrito.getById(req.params.id)
			.catch(err => next(err))
		if (!buscado) res.status(404).send({
			error: 'Carrito no encontrado.'
		})
		res.send(buscado)
	} catch (err) {
		return next(err)
	}
})

router.post("/:id/productos", async (req, res, next) => {
	/* POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto */
	const newProduct = await contenedorCarrito.saveCart(req.params.id, req.body)
		.catch(err => next(err))
	res.send({
		status: 'OK'
	})
})


router.delete("/:id/productos/:id_prod", async (req, res) => {
	/* DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto */
	console.log(req.params.id, req.params.id_prod)
	const buscado = await contenedorCarrito.deleteCartByIdProd(req.params.id, req.params.id_prod)
	//.catch(err => next(err))
	if (buscado === null) return res.status(404).send({
		error: 'Carrito/producto no encontrado.'
	})
	else
		res.send({
			status: 'OK'
		})
})

module.exports = router;