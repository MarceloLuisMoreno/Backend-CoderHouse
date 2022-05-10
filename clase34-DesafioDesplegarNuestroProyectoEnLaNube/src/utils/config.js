const dotenv = require("dotenv")
dotenv.config()

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    administrador: Boolean(true),
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
    }
}

module.exports = config