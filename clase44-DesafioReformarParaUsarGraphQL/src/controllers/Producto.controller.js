const ProductosDAOFactory = require("../persistencia/DAOs/ProductoDAOFactory.class")
const ProductoDTO = require("../persistencia/DTOs/ProductoDTO.class")
const logger = require("../loggers/logger")

const DAO = ProductosDAOFactory.get()


async function listar(id) {
    let doc = await DAO.listar(id)
    if (!doc) {
        logger.error(`No se encontró Producto con id ${id}`)
        throw new Error(`No se encontró Producto con id ${id}`)
    } else return new ProductoDTO(doc.id, doc.title, doc.thumbnail, doc.price);
}

async function listarAll() {
    let docs = await DAO.listarAll()
    let prdDTOs = docs.map(o => {
        return new ProductoDTO(o.id, o.title, o.thumbnail, o.price);
    })
    return await prdDTOs
}

async function guardar(elem) {
    try {
        const newTimestamp = new Date()
        const timestamp = newTimestamp.toLocaleString()
        const newElemento = {
            ...elem,
            timestamp
        };
        const id = await DAO.guardar(newElemento);
        return await id
    } catch (error) {
        logger.error(`Error al guardar: ${error}`)
    }
}

async function actualizar(id, elem) {
    await DAO.actualizar(id, elem);
}

async function borrar(id) {
    await DAO.borrar(id);
}

async function borrarAll() {
    await DAO.borrarAll();
}

module.exports = {
    listar,
    listarAll,
    guardar,
    actualizar,
    borrar,
    borrarAll
}