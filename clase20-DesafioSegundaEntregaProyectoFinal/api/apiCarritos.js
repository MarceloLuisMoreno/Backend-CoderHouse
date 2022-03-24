// Api Carritos

let productsDAO
let cartDAO
switch (process.env.DB) {
	case 'memoria':
		productsDAO = require('../src/daos/productos/ProductosDaoMemoria')
		cartDAO = require('../src/daos/carritos/CarritosDaoMemoria')
		break
	case 'mongoDB':
		productsDAO = require('../src/daos/productos/ProductosDaoMongoDB')
		cartDAO = require('../src/daos/carritos/CarritosDaoMongoDB')
		break
	case 'Firebase':
		cartDAO = require('../src/daos/carritos/CarritosDaoFirebase')
		productsDAO = require('../src/daos/productos/ProductosDaoFirebase')
		break
	default:
		cartDAO = require('../src/daos/carritos/CarritosDaoArchivo')
		productsDAO = require('../src/daos/productos/ProductosDaoArchivo')
		break
}

const getCarritos = async (req, res, next) => {
	try {
		const listCarritos = await cartDAO.getAll()
			.then((resolve) => resolve)
		if (listCarritos.length < 1) {
			throw new Error("No hay carritos.")
		}
		res.json(listCarritos)
	} catch (error) {
		next(error)
	}
}

const getCarrito = async (req, res, next) => {
	try {
		const id = req.params.id
		const carrito = await cartDAO.getById(id)
			.then((resolve) => resolve)
		if (!carrito) {
			throw new Error("Carrito no encontrado.")
		}
		res.json(carrito)
	} catch (error) {
		next(error)
	}
}

const saveNewCarrito = async (req, res, next) => {
	try {
		const cart = {
			productos: []
		}
		const saveId = await cartDAO.saveElement(cart)
			.then(res => res)
		await res.json(`Se agrego el carrito con éxito. Id: ${saveId}`)
	} catch (error) {
		next(error)
	}
}

const addProdCarrito = async (req, res, next) => {
	try {
		const id = req.params.id
		const newProduct = req.body
		const idProd = process.env.DB === "mongoDB" ? newProduct._id : newProduct.id
		const producto = await productsDAO.getById(idProd)
			.then((resolve) => resolve)
		if (!producto) {
			throw new Error("Producto no encontrado.")
		}
		carrito = await cartDAO.saveProductCart(id, newProduct)
			.then((resolve) => {
				res.json(`El producto ${id}: Se agrego al carrito con éxito.`)
			})
	} catch (error) {
		next(error)
	}

}
const deleteProdCarrito = async (req, res, next) => {
	try {
		const id = req.params.id
		const id_prod = req.params.id_prod
		const buscado = await cartDAO.getById(id)
			.then((resolve) => resolve)
		if (!buscado) {
			throw new Error("Carrito no encontrado.")
		} else {
			await cartDAO.deleteProductCart(id, id_prod).then((resolve) => resolve)
			
		}
		res.json(`Del carrito ${id}: el producto ${id_prod} se borró con éxito.`)
	} catch (error) {
		next(error)
	}
}

const deleteCarrito = async (req, res, next) => {
	try {
		const id = req.params.id
		const buscado = await cartDAO.getById(id)
			.then((resolve) => resolve)
		if (!buscado) {
			throw new Error("Carrito no encontrado.")
		} else {
			await cartDAO.deleteById(id)
				.then((resolve) => {
					res.json(`Carrito ${id}: Se borró con éxito.`)
				})
		}
	} catch (error) {
		next(error)
	}

}


module.exports = {
	getCarrito,
	getCarritos,
	saveNewCarrito,
	addProdCarrito,
	deleteProdCarrito,
	deleteCarrito,
}