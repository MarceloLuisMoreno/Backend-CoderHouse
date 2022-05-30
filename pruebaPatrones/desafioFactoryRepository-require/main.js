const ProductoController = require("./src/controllers/Producto.controller.js")
const MensajeController = require("./src/controllers/Mensaje.controller.js")

const obj = ProductoController;
const objMsj = MensajeController;

// ============== listar todos los productos
console.log('LISTADO DE TODOS LOS PRODUCTOS:')
try {
    const todos = obj.listarAll()
    console.log(todos)

} catch (err) {
    next(err)
}
console.log(obj.listarAll());




// ============== listar todos los mensajes
console.log('LISTADO DE TODOS LOS MENSAJES:')
console.log(objMsj.listarAll());