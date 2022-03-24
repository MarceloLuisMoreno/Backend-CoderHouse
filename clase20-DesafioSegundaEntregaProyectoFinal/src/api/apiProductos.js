// Api Productos
let productsDAO
switch (process.env.DB) {
    case 'memoria':
        productsDAO = require('../daos/productos/ProductosDaoMemoria')
        break
    case 'mongoDB':
        productsDAO = require('../daos/productos/ProductosDaoMongoDB')
        break
    case 'Firebase':
        productsDAO = require('../daos/productos/ProductosDaoFirebase')
        break
    default:
        productsDAO = require('../daos/productos/ProductosDaoArchivo')
        break
}

const getProducts = async (req, res, next) => {
    try {
        const listProd = await productsDAO.getAll()
            .then((resolve) => resolve)
        if (listProd.length < 1) {
            throw new Error("No hay productos")
        }
        res.json(listProd)
    } catch (error) {
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await productsDAO.getById(id)
            .then((resolve) => resolve)
        if (!product) {
            throw new Error("Producto no encontrado.")
        }
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const saveProduct = async (req, res, next) => {
    try {
        const newProduct = req.body
        const saveId = await productsDAO.saveElement(newProduct)
            .then(res => res)
        await res.json(`El Producto se agrego con éxito. Id: ${saveId}`)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const buscado = await productsDAO.getById(id)
            .then((resolve) => resolve)
        if (!buscado) {
            throw new Error("Producto no encontrado.")
        } else {
            await productsDAO.deleteById(id)
                .then((resolve) => {
                    res.json(`Producto ${id}: Se borró con éxito.`)
                })
        }
    } catch (error) {
        next(error)
    }
}

const updateProdById = async (req, res, next) => {
    try {
        const id = req.params.id
        const newProduct = req.body
        await productsDAO.updateById(id, newProduct)
            .then((resolve) => {
                res.json(`Producto ${id}: Se actualizó con éxito.`)
            })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    deleteProduct,
    updateProdById,
    saveProduct
}