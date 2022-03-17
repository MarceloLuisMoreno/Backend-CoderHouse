const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const coleccion = 'carritos'
const carritoDAO = new ContenedorFirebase(coleccion)

module.exports = carritoDAO
