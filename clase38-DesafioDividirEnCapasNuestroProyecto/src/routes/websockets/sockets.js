const logger = require('../../loggers/logger')

//    Defino las bases de datos con las que voy a trabajar
const {
    knexMySQL
} = require('../../../options/dbMySQL')

// Clase contenedor: creo una instancia para productos y otra para mensajes. Uso el mismo contenedor para ambas bases de datos.
const ContenedorSql = require('../../contenedores/ContenedorSQL')
const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

const contenedorProductos = new ContenedorSql(knexMySQL, 'products')
const contenedorMessages = new ContenedorArchivo('../../../public/data/messages.json')
const normalizar = require('../../normalizacion/normalizrMessages')



module.exports = (io, socket) => {
    logger.info(`WebSockets: Nuevo cliente conectado`)


    try {

        contenedorProductos.getAll().then(result => {
            if (result.status === "success") {
                console.log(result.payload)
                socket.emit('products', result.payload)
            }
        })

        contenedorMessages.getAll().then(result => {
            if (result.status === "success") {
                console.log(result.payload)
                socket.emit('messages', normalizar.normalizarMensajes(result.payload))
            }
        })

        // Escucho los cambios en productos y los propago a todos
        socket.on('newProduct', product => {
            contenedorProductos.saveProduct(product)
                .then(() => {
                    contenedorProductos.getAll().then(result => {
                        if (result.status === "success") {
                            socket.emit('products', result.payload)
                        }
                    })
                })
        })


        //*****MENSAJES*****
        //Envío la lista de mensajes guardados al Cliente
        //let messages = await contenedorMessages.getAll();

        /*         (async () => {
                    console.log(await contenedorMessages.getAll())
                    socket.emit('messages', normalizar.normalizarMensajes(await contenedorMessages.getAll()))
                })()

         */
        /*         contenedorMessages.getAll().then(result => {
                    if (result.status === "success") {
                        console.log(result.payload)
                        socket.emit('messages', normalizar.normalizarMensajes(result.payload))
                    }
                })
         */

        // Escucho los mensajes enviados por el cliente y se los propago a todos
        socket.on('newMessage', async message => {
            await contenedorMessages.saveAll(message)
            let messages = await contenedorMessages.getAll()
            let messagesNormalizr = normalizar.normalizarMensajes(messages)
            io.sockets.emit('messages', messagesNormalizr)
        })


    } catch (error) {
        socket.emit('error', {
            error: error.message
        })
    }
}