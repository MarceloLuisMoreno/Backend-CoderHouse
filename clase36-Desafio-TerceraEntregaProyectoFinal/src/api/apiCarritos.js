// Api Carritos
// cargo las configuraciones del sistema de .ENV
const config = require('../utils/config')

const mensajeria = require('../utils/mensajeria')

const DataBase = config.DB_app
let productsDAO
let cartDAO

switch (DataBase) {
	case 'memoria':
		productsDAO = require('../daos/productos/ProductosDaoMemoria')
		cartDAO = require('../daos/carritos/CarritosDaoMemoria')
		break
	case 'mongoDB':
		productsDAO = require('../daos/productos/ProductosDaoMongoDB')
		cartDAO = require('../daos/carritos/CarritosDaoMongoDB')
		userDAO = require('../daos/RegisterUserDaoMongoDB')
		break
	case 'Firebase':
		cartDAO = require('../daos/carritos/CarritosDaoFirebase')
		productsDAO = require('../daos/productos/ProductosDaoFirebase')
		break
	default:
		cartDAO = require('../daos/carritos/CarritosDaoArchivo')
		productsDAO = require('../daos/productos/ProductosDaoArchivo')
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
		const carrito = await cartDAO.getByCart(id)
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
		const id = req.params.id
		const cart = {
			productos: []
		}
		const saveId = await cartDAO.saveCart(id, cart)
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
		const idProd = DataBase === "mongoDB" ? newProduct[0]._id : newProduct[0].id
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
		const cliente = req.params.id
		const id_prod = req.params.id_prod
		const buscado = await cartDAO.getByCart(cliente)
			.then((resolve) => resolve)
		if (!buscado) {
			throw new Error("Carrito no encontrado.")
		} else {
			await cartDAO.deleteProductCart(cliente, id_prod).then((resolve) => resolve)
		}
		res.json(`Del carrito ${id}: el producto ${cliente_prod} se borró con éxito.`)
	} catch (error) {
		next(error)
	}
}

const deleteCarrito = async (req, res, next) => {
	try {
		const id = req.params.id
		const buscado = await cartDAO.getByCart(id)
			.then((resolve) => resolve)
		if (!buscado) {
			throw new Error("Carrito no encontrado.")
		} else {
			await cartDAO.deleteByCart(id)
				.then((resolve) => {
					res.json(`Carrito ${id}: Se borró con éxito.`)
				})
		}
	} catch (error) {
		next(error)
	}
}

const compraProductos = async (req, res, next) => {
	try {

		const cliente = req.params.id
		const buscado = await cartDAO.getByCart(cliente)
			.then((resolve) => resolve)
		if (!buscado) {
			throw new Error("Carrito no encontrado.")
		} else {
			const usuario = await userDAO.getById(cliente)
			const celular = usuario.celular
			mensajeria.sms(`${usuario.nombre}, su Pedido ha sido recibido y se encuentra en proceso. Gracias por su compra.`,celular)
			mensaje = `Nuevo Pedido de ${usuario.nombre}, email: ${cliente}.`
			mensajeria.whatsapp(mensaje)
			let listado = `<h2 style="color: blue;">Nuevo Pedido de ${usuario.nombre}, email: ${cliente}, el detalle es el siguiente:</h2>
			<ul>`
			buscado[0].productos
				.map((prod, index) => {
					listado += `<li>${index+1} - Producto: ${prod._id} - ${prod.codigo} - ${prod.nombre} - $ ${prod.precio} </li>`
				})
			listado=listado + '</u>'
			listado=listado + '<h2 style="color: blue;">Nuevo Pedido de la App E-commerce.</h2>'
			mensajeria.gmail(mensaje,listado)
			await cartDAO.deleteByCart(cliente)
				.then((resolve) => {
					res.json(`Carrito ${cliente}: Se borró con éxito.`)
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
	compraProductos
}