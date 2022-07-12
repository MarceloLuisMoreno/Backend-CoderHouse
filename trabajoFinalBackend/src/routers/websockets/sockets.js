const logger = require('../../loggers/logger')

//================[Base de Datos mensajes]======================
const mensajes = require('../../controllers/Mensaje.controller')

const normalizar = require('../../normalizacion/normalizrMessages')

module.exports = (io, socket) => {
    logger.info(`WebSockets: Nuevo cliente conectado`)
    mensajes.listarTodos().then(result => {
        socket.emit('messages', normalizar.normalizarMensajes(result))
    })

    socket.on('newMessage', async message => {
        await mensajes.enviarMensaje(message)
        let messages = await mensajes.listarTodos()
        let messagesNormalizr = normalizar.normalizarMensajes(messages)
        io.sockets.emit('messages', messagesNormalizr)
    })

}