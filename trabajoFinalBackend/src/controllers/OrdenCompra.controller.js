const OrdenesDAOFactory = require("../persistencia/DAOs/OrdenDAOFactory.class")
const DAO = OrdenesDAOFactory.get()

const logger = require("../loggers/logger")

async function listar(req, res) {
    try {
        const email = req.params.email
        let orden = await DAO.listar(email)
        if (!orden || orden.length < 1) {
            const err = `Error no se encontró Orden cliente: ${email}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            res.status(200).json(orden);
        }
    } catch (error) {
        logger.warn(`Error al listar un Orden: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function checkOut(req, res) {
    try {
        const user = await User.findById(req.user._id);
        let {
            email,
            fullname
        } = user;
        const cart = await cartsDao.get(user);
        const {
            deliveryAddress
        } = req.body;
        const productsInCart = await Promise.all(
            cart.products.map(async (element) => {
                const product = await Products.findById(element.productId);
                return {
                    product: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: element.quantity,
                };
            })
        );
        const newOrderData = {
            userName: fullname,
            products: productsInCart,
            userEmail: email,
            date: moment(new Date()).format('DD/MM/YY HH:mm'),
            state: 'Generada',
            deliveryAddress: deliveryAddress,
        };
        const newOrder = await ordersDao.create(newOrderData);
        checkOutEMail(newOrderData);
        await cartsDao.delete(cart._id);
        const info = `Orden de compra creada con éxito.`
        logger.info(info)
        res.status(200).json({
            message: info
        });
    } catch (error) {
        logger.warn(`Error al generar la orden. ${error}`);
        return res.status(500).json({
            error_description: 'Error del servidor.'
        });
    }
}

async function guardar(req, res) {
    try {
        const id = req.params.id
        const orden = req.params.body
        const newTimestamp = new Date()
        const timestamp = newTimestamp.toLocaleString()
        const cliente = id
        const nuevaOrden = {
            timestamp,
            cliente,
            productos
        }
        const ordenId = await DAO.guardarNuevo(carrito)
        const info = `La orden se agregó con éxito. Id: ${ordenId._id}`
        logger.info(info)
        return res.status(201).json({
            message: info
        })
    } catch (error) {
        logger.warn(`Error al guardar Orden compra: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

module.exports = {
    listar,
    guardar
}