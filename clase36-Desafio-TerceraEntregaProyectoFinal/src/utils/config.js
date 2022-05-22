const dotenv = require("dotenv")
const twilio = require("twilio")
dotenv.config()

const config = {
    PORT: process.env.PORT || 3000,
    DB_app: process.env.DB || 'mongoDB',
    MODO : process.env.MODO,
    NODE_ENV: process.env.NODE_ENV,
    administrador: Boolean(true),
    contactoAdministrador: process.env.CONTACTO_ADMINISTRADOR,
    emailUser: process.env.EMAIL_ADMINISTRADOR,
    emailPass: process.env.EMAIL_PASS,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: process.env.MONGO_URL_LOCAL
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: process.env.MONGO_URL_REMOTE,
        clave: process.env.MONGO_URL_REMOTE_CLAVE
    },
    dbMySQL: {
        host:  process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    firebase: {
        serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
        databaseURL: process.env.FIREBASE_DATABASE_URL
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE3_FILENAME
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_NAME
        }
    },
    archivos: {
        path: process.env.PATH_ARCHIVO
    },
    accountSid: process.env.TWILIO_accountSid,
    authToken: process.env.TWILIO_authToken,
    messagingServiceSid: process.env.TWILIO_messagingServiceSid,
    twilioWhatsapp: process.env.TWILIO_whatsapp
}


module.exports = config