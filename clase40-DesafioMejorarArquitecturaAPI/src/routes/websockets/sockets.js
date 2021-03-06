const logger = require('../../loggers/logger')
//    Defino las bases de datos con las que voy a trabajar

const ProductoController = require("../../controllers/Producto.controller.js")
const MensajeController = require("../../controllers/Mensaje.controller.js")

const productos = ProductoController
const mensajes = MensajeController

const normalizar = require('../../normalizacion/normalizrMessages')

module.exports = (io, socket) => {
    logger.info(`WebSockets: Nuevo cliente conectado`)

    //    try {

    productos.listarAll().then(result => {
        socket.emit('products', result)
    })

    mensajes.listarAll().then(result => {
        socket.emit('messages', normalizar.normalizarMensajes(result))

    })

    // Escucho los cambios en productos y los propago a todos
    socket.on('newProduct', product => {
        productos.guardar(product)
            .then(() => {
                productos.listarAll().then(result => {
                    socket.emit('products', result)
                })
            })
    })

    // Escucho los mensajes enviados por el cliente y se los propago a todos
    socket.on('newMessage', async message => {
        await mensajes.guardar(message)
        let messages = await mensajes.listarAll()
        let messagesNormalizr = normalizar.normalizarMensajes(messages)
        io.sockets.emit('messages', messagesNormalizr)
    })


    /*     } catch (error) {
            socket.emit('error', {
                error: error.message
            })
         }*/
}