const dotenv = require("dotenv")
dotenv.config()

const config = {
    sistema: process.env.SISTEMA || 'PROD',
    administrador: process.env.ADMINISTRADOR || 'false',
    contactoAdministrador: process.env.CONTACTO_ADMINISTRADOR,
    emailUser: process.env.EMAIL_ADMINISTRADOR,
    emailPass: process.env.EMAIL_PASS,
    tiempoSession: process.env.TIEMPO_SESSION,
    jwt_privateKey: process.env.JWT_PRIVATE_KEY,
    PORT: process.env.PORT || 8080,
    DB_app: process.env.DB || 'mongoDB',
    MODO: process.env.MODO,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: process.env.MONGO_URL_LOCAL
    },
    mongodb: {
        connstr: process.env.MONGO_URL_LOCAL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: process.env.MONGO_URL_REMOTE,
        clave: process.env.MONGO_URL_REMOTE_CLAVE
    },
    filedb: {
        pathdb: './DB'
    },
    archivos: {
        path: process.env.PATH_ARCHIVO
    },
    srv: {
        persistencia: process.env.PERSISTENCIA
    },
    accountSid: process.env.TWILIO_accountSid,
    authToken: process.env.TWILIO_authToken,
    messagingServiceSid: process.env.TWILIO_messagingServiceSid,
    twilioWhatsapp: process.env.TWILIO_whatsapp

}

module.exports = config