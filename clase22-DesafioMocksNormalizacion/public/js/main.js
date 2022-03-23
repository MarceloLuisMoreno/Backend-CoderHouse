// Mi cliente
const socket = io.connect();
//  Normalizr 
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// TP Normalizr
// TP Normalizr
//author
const schemaAuthor = new schema.Entity('author', {}, {
    idAttribute: 'mail'
})
// Mensaje
const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })

// Mensajes
const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

console.log('entre a main')

//Función para testear que ingrese una cadena de email
function testmail(mail) {
    try {
        var exp = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i
        return exp.test(mail)
    } catch (error) {
        return false;
    }
}

//Capturo el evento input MENSAJES y le sumo la fecha
function SendMesage() {

    if (document.getElementById('id').value == "" ||
        document.getElementById('nombre').value == "" ||
        document.getElementById('apellido').value == "" ||
        document.getElementById('edad').value == "" ||
        document.getElementById('alias').value == "" ||
        document.getElementById('avatar').value == "" ||
        document.getElementById('mensaje').value == "") {
        alert("Campos Incompletos")
        return false
    }
    const mensaje = {
        author: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('mensaje').value
    }
    socket.emit('newMessage', mensaje);
    document.getElementById('mensaje').value = "";
    return false;
}


//Emito los mensajes usando una plantilla Handlebars
const tableMessages = async messages => {
    const template = await fetch('../viewsHBS/messages.hbs');
    const templateText = await template.text();
    const templateHbs = Handlebars.compile(templateText);
    const html = templateHbs({ messages });
    return html
};
socket.on('messages', messages => {
    console.log(messages)
    const denormalizedData = denormalize(messages.result, schemaMensajes, messages.entities)
    const newMessage = denormalizedData.mensajes
    tableMessages(newMessage)
        .then(html => document.getElementById('tableMessages').innerHTML = html);
});


//Capturo el evento del formulario
function addProduct(e) {
    const newProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    document.getElementById("formProduct").reset() //reset formulario
    socket.emit('newProduct', newProduct);
    return false;
}

//Emito los productos usando una plantilla Handlebars
const tableHandlebars = async products => {
    const template = await fetch('../viewsHBS/products.hbs');
    const templateText = await template.text();
    const templateHbs = Handlebars.compile(templateText);
    const html = templateHbs({ products });
    return html
};

socket.on('products', products => {
    tableHandlebars(products)
        .then(html => document.getElementById('tableProducts').innerHTML = html)
        ;
});
