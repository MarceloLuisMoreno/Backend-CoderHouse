// cargo las configuraciones del sistema de .ENV
const config = require('../config/config')
const mensajeria = require('../utils/mensajeria')

//  Carrito
const CarritosDAOFactory = require("../persistencia/DAOs/CarritoDAOFactory.class")
const DAOcart = CarritosDAOFactory.get()

// Producto
const ProductosDAOFactory = require("../persistencia/DAOs/ProductoDAOFactory.class")
const DAOprod = ProductosDAOFactory.get()

// usuario
const UsuariosDAOFactory = require("../persistencia/DAOs/UsuarioDAOFactory.class")
const DAOusuario = UsuariosDAOFactory.get()

// ordenes
const OrdenesDAOFactory = require("../persistencia/DAOs/OrdenDAOFactory.class")
const DAOordenes = OrdenesDAOFactory.get()


const logger = require("../loggers/logger")
const DAO = require('../persistencia/DAOs/DAO.class')


async function listarCarrito(req, res) {
    try {
        const id = req.params.id
        let carrito = await DAOcart.leerCarritoCliente(id)
        if (!carrito || carrito.length < 1) {
            const err = `Error al listar un carrito id: ${id}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            res.status(200).json(carrito);
        }
    } catch (error) {
        logger.warn(`Error al listar carrito: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function listarTodos(req, res) {
    try {
        let carritos = await DAOcart.listarTodos()
        if (!carritos) {
            const err = `Error no hay carritos.`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            res.status(200).json(carritos)
        }
    } catch (error) {
        logger.warn(`Error al listar todos los carritos: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function crearNuevoCarrito(req, res) {
    try {
        const id = req.params.id
        const newTimestamp = new Date()
        const timestamp = newTimestamp.toLocaleString()
        const cliente = id
        const carrito = {
            timestamp,
            cliente,
            productos: []
        }
        const carritoId = await DAOcart.guardarNuevo(carrito)
        const info = `Se agrego el carrito con éxito. Id: ${carritoId._id}`
        logger.info(info)
        return res.status(201).json({
            message: info
        })
    } catch (error) {
        logger.warn(`Error al guardar carrito: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function incorporarProductoCarrito(req, res) {
    try {
        const cliente = req.params.id
        const producto = req.body
        let carrito = await DAOcart.leerCarritoCliente(cliente)
        if (!carrito || carrito.length < 1) {
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            cart = {
                timestamp,
                cliente,
                productos: []
            }
            carrito = [cart]
            await DAOcart.guardarNuevo(cart)
        }
        const buscarProducto = await DAOprod.listar(producto.id)
        if (!buscarProducto || buscarProducto.length < 1) {
            const err = `No se encontro producto ${producto.id} para incorporar al carrito.`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            await DAOcart.guardaProductoCarrito(cliente, buscarProducto, carrito)
            const info = `Se agrego el producto al carrito con éxito.`
            logger.info(info)
            return res.status(201).json({
                message: info
            })
        }
    } catch (error) {
        logger.warn(`Error al incorporar producto al carrito: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }

}
async function borrarProductoCarrito(req, res, next) {
    try {
        const cliente = req.params.id
        const idProd = req.params.id_prod
        const carrito = await DAOcart.leerCarritoCliente(cliente)
        if (!carrito || carrito.length < 1) {
            const err = `Error No se encontró un carrito id: ${cliente}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            let productos = await carrito[0].productos
            const indexProd = productos.findIndex(idProduc => idProduc._id == idProd)
            if (indexProd != -1) {
                const newProductos = productos.filter(product => product._id != idProd)
                carrito[0].productos = newProductos
                const borrar = await DAOcart.actualizarCarrito(cliente, carrito[0].productos)
                const info = `Del carrito ${cliente}: el producto ${idProd} se borró con éxito.`
                logger.info(info)
                return res.status(200).json(info)
            } else {
                const err = `No se encontro producto para borrar del carrito.`
                logger.error(err)
                return res.status(400).json({
                    error_description: err
                })
            }
        }
    } catch (error) {
        logger.warn(`Error al borrar producto carrito: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function borrarCarrito(req, res, next) {
    try {
        const cliente = req.params.id
        const carrito = await DAOcart.leerCarritoCliente(cliente)
        if (!carrito || carrito.length < 1) {
            const err = `Error al listar un carrito cliente: ${cliente}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            await DAOcart.borrarCarrito(cliente)
            info = `Carrito ${cliente}: Se borró con éxito.`
            logger.info(info)
            res.status(200).json(info)
        }
    } catch (error) {
        logger.warn(`Error al borrar carrito: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function cierreCompra(req, res, next) {
    try {
        const cliente = req.params.id
        const carrito = await DAOcart.leerCarritoCliente(cliente)
        if (!carrito || carrito.length < 1) {
            const err = `Error, no se encontró carrito cliente: ${cliente}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            const usuario = await DAOusuario.listar(cliente)
            const celular = usuario.celular
            const numeroOrden = await DAOordenes.cantidadOrdenes() + 1
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            ordenCompra = {
                numeroOrden: numeroOrden,
                timestamp: timestamp,
                nombre: usuario.nombre,
                email: usuario.email,
                direccion: usuario.direccion,
                estadoOrden: 'Generada.',
                productos: carrito[0].productos
            }
            const orden = await DAOordenes.guardar(ordenCompra)
            mensajeria.sms(ordenCompra, celular)
            mensajeria.whatsapp(ordenCompra)
            mensajeria.gmail(ordenCompra)
            await DAOcart.borrarCarrito(cliente)
            info = `Carrito ${cliente}: Se generó orden de compra con éxito.`
            logger.info(info)
            res.status(200).json(info)
        }
    } catch (error) {
        logger.warn(`Error server: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}


module.exports = {
    listarCarrito,
    listarTodos,
    crearNuevoCarrito,
    incorporarProductoCarrito,
    borrarProductoCarrito,
    borrarCarrito,
    cierreCompra
}