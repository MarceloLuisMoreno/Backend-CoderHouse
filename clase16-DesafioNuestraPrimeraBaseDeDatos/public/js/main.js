// Mi cliente
const socket = io.connect();

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
const email = document.querySelector("input[name='email']")
const text = document.querySelector("input[name='text']")
document.querySelector("button[name='messages']").addEventListener('click', () => {
    const date = new Date()
    if (testmail(email.value)) {
        const mensaje = {
            email: email.value,
            date: date.toLocaleString(),
            text: text.value
        };
        socket.emit('newMessage', mensaje);
    }
})

//Emito los mensajes usando una plantilla Handlebars
const tableMessages = async messages => {
    const template = await fetch('../viewsHBS/messages.hbs');
    const templateText = await template.text();
    const templateHbs = Handlebars.compile(templateText);
    const html = templateHbs({ messages });
    return html
};
socket.on('messages', messages => {
    tableMessages(messages)
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
