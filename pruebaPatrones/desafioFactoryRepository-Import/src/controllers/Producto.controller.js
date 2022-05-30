import ProductosDAOFile from "../services/ProductosDAO.file.js";
import ProductoDTO from "../classes/ProductoDTO.class.js";
import config from "../utils/config.js";
import ProductosDAOMem from "../services/ProductosDAO.mem.js";
import ProductosDAOMongoDB from "../services/ProductosDAO.mongodb.js";

let prdDAO = null;

switch (config.srv.persistencia) {
    case 'mongodb':
        prdDAO = new ProductosDAOMongoDB();
        break;
    case 'file':
        prdDAO = new ProductosDAOFile();
        break;
    case 'memoria':
        prdDAO = new ProductosDAOMem();
        break;
    default:
        break;
}

const ProductoController = {
    async listar(id) {
        let doc = await prdDAO.listar(id);
        console.log('listar id: ', id)
        console.log(doc)
        return new ProductoDTO(doc.id, doc.title, doc.thumbnail, doc.price);
    },

    async listarAll() {
        let docs = await prdDAO.listarAll();
        let prdDTOs = docs.map(o => {
            return new ProductoDTO(o.id, o.title, o.thumbnail, o.price);
        })
        return prdDTOs;
    },

    async guardar(elem) {
        await prdDAO.guardar(elem);
    },

    async actualizar(id) {
        await prdDAO.actualizar(id);
    },

    async borrar(id) {
        await prdDAO.borrar(id);
    },

    async borrarAll() {
        await prdDAO.borrarAll();
    }
}

export default ProductoController;