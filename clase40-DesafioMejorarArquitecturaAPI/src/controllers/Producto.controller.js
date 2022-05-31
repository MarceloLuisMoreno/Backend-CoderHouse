const config = require("../config/config")
const ProductosDAOFile = require("../services/ProductosDAO.file.js")
const ProductoDTO = require("../classes/ProductoDTO.class.js")
const ProductosDAOMem = require("../services/ProductosDAO.mem.js")
const ProductosDAOMongoDB = require("../services/ProductosDAO.mongodb.js")
const logger = require("../loggers/logger")


let prdDAO
switch (config.srv.persistencia) {
    case 'mongodb':
        prdDAO = new ProductosDAOMongoDB();
        break;
    case 'file':
        prdDAO = new ProductosDAOFile();
        break;
    default:
        prdDAO = new ProductosDAOMem();
        break;
}

async function listar(id) {
    let doc = await prdDAO.listar(id)
    return new ProductoDTO(doc.id, doc.title, doc.thumbnail, doc.price);
}

async function listarAll() {
    let docs = await prdDAO.listarAll()
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
        const id = await prdDAO.guardar(newElemento);
        return id
    } catch (error) {
        logger.error(`Error al guardar: ${error}`)
        throw new Error(`Error al guardar: ${error}`)
    }
}

async function actualizar(id) {
    await prdDAO.actualizar(id);
}

async function borrar(id) {
    await prdDAO.borrar(id);
}

async function borrarAll() {
    await prdDAO.borrarAll();
}

module.exports = {
    listar,
    listarAll,
    guardar,
    actualizar,
    borrar,
    borrarAll
}