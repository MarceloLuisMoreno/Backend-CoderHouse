const config = require('../../../config.js')

const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

const path = config.archivos.path
const cartDAO = new ContenedorArchivo(path, 'carrito')

module.exports = cartDAO
