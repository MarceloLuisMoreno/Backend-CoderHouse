const ContenedorMemoria = require('../../contenedores/ContenedorMemoria')

module.exports = class CarritosDaoMemoria extends ContenedorMemoria {

    constructor(file) {
        super(file)
    }

    async conectarCarrito() {
        console.log("Conectado con carritosDao Memoria")
    }
}
