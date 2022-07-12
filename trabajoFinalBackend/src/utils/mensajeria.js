const nodemailer = require('nodemailer')
const config = require('../config/config')
//configuracion Twilio
const accountSid = config.accountSid
const authToken = config.authToken
const twilioWhatsapp = config.twilioWhatsapp
const messagingServiceSid = config.messagingServiceSid
const contactoAdministrador = config.contactoAdministrador
const logger = require('../loggers/logger')

// cargo las configuraciones nodemailer gmail
const emailUser = config.emailUser
const emailPass = config.emailPass
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});


const client = require('twilio')(accountSid, authToken);


function whatsapp(orden) {
    mensaje = `Nueva Orden de Compra de ${orden.nombre}, email: ${orden.cliente}. Número de Orden: ${orden.numeroOrden}`
    const from = 'whatsapp:' + twilioWhatsapp
    const to = 'whatsapp:' + contactoAdministrador
    client.messages
        .create({
            body: mensaje,
            from: from,
            to: to
        })
        .then(message => logger.info('Whatsapp enviado.'));
}

function sms(orden, para) {
    const mensaje = `${orden.nombre}, su Pedido ha sido recibido y se encuentra en proceso. Número de Orden de Compra: ${orden.numeroOrden}. Gracias por su compra!!!.`
    client.messages
        .create({
            body: mensaje,
            messagingServiceSid: messagingServiceSid,
            to: para
        })
        .then(message => logger.info('SMS enviado.'))
        .done();
}

function gmail(orden) {
    const asunto = `Nueva Orden de Compra de ${orden.nombre}, email: ${orden.cliente}. Número de Orden: ${orden.numeroOrden}`
    let mensaje = `<h2 style="color: blue;">Nuevo Orden de Compra,  Número ${orden.numeroOrden} de ${orden.nombre}, email: ${orden.email}, el detalle es el siguiente:</h2>
    <ul>`
    orden.productos
        .map((prod, index) => {
            mensaje += `<li>${index+1} - Producto: ${prod._id} - Cant. 1 - ${prod.title} - $ ${prod.price} </li>`
        })
    mensaje = mensaje + '</u>'
    mensaje = mensaje + `<h2 style="color: blue;">Dirección de entrega: ${orden.direccion}</h2>`
    mensaje = mensaje + `<br><br>`
    mensaje = mensaje + '<h2 style="color: blue;">Nuevo Pedido de la App E-commerce.</h2>'

    const mailOptions = {
        from: 'Servidor Node.js',
        to: emailUser,
        subject: asunto,
        html: mensaje,
    }

    transporter.sendMail(mailOptions, async function (error, info) {
        logger.info("senMail returned!");
        if (error) {
            logger.error("ERROR!!!!!!", error);
        } else {
            logger.info('Email enviado. ');
        }
    });
}

function gmailNuevo(usuario) {
    const asunto = 'Nuevo Usuario de App.'
    const mensaje = `<h2 style="color: blue;">Se registro un nuevo usuario en la App Ecommerce:</h2>
    <ul>
        <li>Nombre: ${usuario.nombre}</li>
        <li>Email: ${usuario.email}</li>
        <li>Dirección: ${usuario.direccion}</li>
        <li>Edad: ${usuario.edad}</li>
        <li>Teléfono Celular: ${usuario.celular}</li>
        <li>Foto url: ${usuario.avatar}</li>
    </ul>
    <h2 style="color: blue;">Mensaje desde la App Ecommerce.</h2>
    `
    const mailOptions = {
        from: 'Servidor Node.js',
        to: emailUser,
        subject: asunto,
        html: mensaje,
    }

    transporter.sendMail(mailOptions, async function (error, info) {
        logger.info("senMail returned!");
        if (error) {
            logger.error("ERROR!!!!!!", error);
        } else {
            logger.info('Email enviado. ');
        }
    });
}


module.exports = {
    whatsapp,
    sms,
    gmail,
    gmailNuevo
};