const nodemailer = require('nodemailer')
const config = require('../utils/config')
//configuracion Twilio
const accountSid = config.accountSid
const authToken = config.authToken
const twilioWhatsapp = config.twilioWhatsapp
const messagingServiceSid = config.messagingServiceSid
const contactoAdministrador = config.contactoAdministrador
const codigoArea = config.codigoAreaCelular
const logger = require('../loggers/logger')

// cargo las configuraciones nodemailer gmail
const emailUser = config.emailUser
const emailPass = config.emailPass
const client = require('twilio')(accountSid, authToken);

function whatsapp(mensaje) {
    const from = 'whatsapp:'+twilioWhatsapp
    const to = 'whatsapp:'+contactoAdministrador
    client.messages
        .create({
            body: mensaje,
            // mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
            from: from,
            to: to
        })
        .then(message => logger.info('Whatsapp enviado.',message));
}

function sms(mensaje,para) {
    client.messages
        .create({
            body: mensaje,
            messagingServiceSid: messagingServiceSid,
            to: codigoArea+para
        })
        .then(message => logger.info('SMS enviado.'))
        .done();
}

function gmail(asunto, mensaje) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

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
    gmail
};