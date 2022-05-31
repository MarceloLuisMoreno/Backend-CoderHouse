//  Normalizr 
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;

// TP Normalizr
//author
const schemaAuthor = new schema.Entity('author', {}, {
    idAttribute: 'mail'
})
// Mensaje
const schemaMensaje = new schema.Entity('mensaje', {
    author: schemaAuthor
}, {
    idAttribute: 'id'
})
// Mensajes
const schemaMensajes = new schema.Entity('mensajes', {
    mensajes: [schemaMensaje]
}, {
    idAttribute: 'id'
})

//Normalizo agregando id: 'mensajes', mensajes: mensajes - Es decir que creo un arreglo de mensajes
const normalizarMensajes = (messages) => normalize({
    id: 'mensajes',
    mensajes: messages
}, schemaMensajes)

module.exports = {
    normalizarMensajes
}