const config = require('../../utils/config')

const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

const path = config.archivos.path
const cartDAO = new ContenedorArchivo(path, 'carrito')

module.exports = cartDAO
