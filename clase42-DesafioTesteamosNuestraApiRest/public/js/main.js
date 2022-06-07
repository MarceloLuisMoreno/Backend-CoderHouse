// Mi cliente
const socket = io.connect();

/*=======[defino ruta endpoints]=======*/
let url = window.location.href
if (url.includes("localhost"))
    url = "http://localhost:8080"
else url = "https://coderhouserterceraentrega.herokuapp.com"

API_URLproductos = `${url}/api/productos/`

//  Normalizr 
const denormalize = normalizr.denormalize;
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

    if (document.getElementById('mail').value == "" ||
        document.getElementById('nombre').value == "" ||
        document.getElementById('apellido').value == "" ||
        document.getElementById('edad').value == "" ||
        document.getElementById('alias').value == "" ||
        document.getElementById('avatar').value == "" ||
        document.getElementById('mensaje').value == "") {
        alert("Campos Incompletos")
        return false
    }
    const date = new Date()
    const mensaje = {
        author: {
            mail: document.getElementById('mail').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('mensaje').value,
        date: date.toLocaleString(),
    }
    socket.emit('newMessage', mensaje);
    document.getElementById('mensaje').value = "";
    return false;
}


//Emito los mensajes usando una plantilla Handlebars
const tableMessages = async messages => {
    const template = await fetch('../views/messages.hbs');
    const templateText = await template.text();
    const templateHbs = Handlebars.compile(templateText);
    const html = templateHbs({
        messages
    });
    return html
};
socket.on('messages', messages => {
    const denormalizedData = denormalize(messages.result, schemaMensajes, messages.entities)
    const newMessages = denormalizedData.mensajes

    const sizeNormalized = JSON.stringify(messages).length
    const sizeDenormalizr = JSON.stringify(denormalizedData).length

    const compresion = parseInt((sizeNormalized * 100) / sizeDenormalizr)

    document.getElementById('compresion-info').innerText = compresion;

    tableMessages(newMessages)
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
    const template = await fetch('../views/products.hbs');
    const templateText = await template.text();
    const templateHbs = Handlebars.compile(templateText);
    const html = templateHbs({
        products
    });
    return html
};

socket.on('products', products => {
    tableHandlebars(products)
        .then(html => document.getElementById('tableProducts').innerHTML = html);
});

//Funcion elimino producto
function eliminoProducto(idProd) {
    const URL = API_URLproductos + idProd
    axios({
            method: 'delete',
            url: URL
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    window.location.reload()
}