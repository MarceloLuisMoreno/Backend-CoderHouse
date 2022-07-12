const ProductosDAOFactory = require("../persistencia/DAOs/ProductoDAOFactory.class")
const ProductoDTO = require("../persistencia/DTOs/ProductoDTO.class")
const logger = require("../loggers/logger")

const DAO = ProductosDAOFactory.get()


async function listar(req, res) {
    try {
        const id = req.params.id
        let prod = await DAO.listar(id)
        if (!prod || prod.length < 1) {
            const err = `Error, no se encontró producto id: ${id}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            const producto = prod.map(prod => {
                return new ProductoDTO(prod.id, prod.title, prod.category, prod.thumbnail, prod.price);
            })
            res.status(200).json(producto[0]);
        }
    } catch (error) {
        logger.warn(`Error al listar un producto: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function listarCategoria(req, res) {
    try {
        const categoria = req.params.categoria
        let productos = await DAO.listarCategoria(categoria)
        if (!productos || productos.length < 1) {
            const err = `Error, no hay productos categoria: ${categoria}`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            let prdDTOs = productos.map(prod => {
                return new ProductoDTO(prod.id, prod.title, prod.category, prod.thumbnail, prod.price);
            })
            res.status(200).json(prdDTOs)
        }
    } catch (error) {
        logger.warn(`Error al listar un producto: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function listarTodos(req, res) {
    try {
        let productos = await DAO.listarTodos()
        if (!productos) {
            const err = `Error, no se encontraron productos.`
            logger.error(err)
            return res.status(400).json({
                error_description: err
            })
        } else {
            let prdDTOs = productos.map(prod => {
                return new ProductoDTO(prod.id, prod.title, prod.category, prod.thumbnail, prod.price);
            })
            res.status(200).json(prdDTOs)
        }
    } catch (error) {
        logger.warn(`Error al listar todos los productos: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function guardar(req, res) {
    try {
        const nuevoProducto = req.body
        const id = await DAO.guardar(nuevoProducto);
        const info = `Producto creado con éxito, id: ${id._id}`
        logger.info(info)
        return res.status(201).json({
            message: info
        });
    } catch (error) {
        logger.error(`Error al guardar: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function actualizar(req, res) {
    try {
        const id = req.params.id
        const producto = req.body
        await DAO.actualizar(id, producto);
        const info = `Producto actualizado con éxito, id: ${id}`
        logger.info(info)
        return res.status(201).json({
            message: info
        });
    } catch (error) {
        logger.warn(`Error al actualizar: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function borrar(req, res) {
    try {
        const producto = await DAO.borrar(req.params.id)
        if (!producto || producto.deletedCount === 0) {
            const err = `Error, no se encuentra producto id: ${req.params.id}`
            logger.error(err)
            return res.status(404).json({
                error_description: err
            });
        }
        res.status(200).json({
            message: 'Producto borrado.'
        });
    } catch (error) {
        logger.error(`Error al borrar: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }
}

async function borrarTodos() {
    try {
        const producto = await DAO.borrarTodos()
        if (!producto) {
            const err = `Error al Borrar todos los productos.`
            logger.error(err)
            return res.status(404).json({
                error_description: err
            });
        }
        res.status(200).json({
            message: 'Todos los productos borrados.'
        });
    } catch (error) {
        logger.warn(`Error al Borrar todos los productos: ${error}`)
        return res.status(500).json({
            error_description: 'Server error.'
        });
    }

}

module.exports = {
    listar,
    listarCategoria,
    listarTodos,
    guardar,
    actualizar,
    borrar,
    borrarTodos
}