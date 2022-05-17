const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const coleccion = 'productos'
const productsDAO = new ContenedorFirebase(coleccion)

module.exports = productsDAO
