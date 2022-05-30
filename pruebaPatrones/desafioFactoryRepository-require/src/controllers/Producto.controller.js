const config = require("../utils/config.js")
const ProductosDAOFile = require("../services/ProductosDAO.file.js")
const ProductoDTO = require("../classes/ProductoDTO.class.js")
const ProductosDAOMem = require("../services/ProductosDAO.mem.js")
const ProductosDAOMongoDB = require("../services/ProductosDAO.mongodb.js")

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
    let doc = await prdDAO.listar(id).then(res => res)
    return new ProductoDTO(doc.id, doc.title, doc.thumbnail, doc.price);
}

listarAll = async () => {
    let docs = await prdDAO.listarAll()
    let prdDTOs = docs.map(o => {
        return new ProductoDTO(o.id, o.title, o.thumbnail, o.price);
    })
    return prdDTOs;
}

async function guardar(elem) {
    await prdDAO.guardar(elem);
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