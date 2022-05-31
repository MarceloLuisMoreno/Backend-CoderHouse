const dotenv = require("dotenv")
dotenv.config()

const config = {
    NODE_ENV: process.env.NODE_ENV,
    administrador: Boolean(false),
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
    dbMySQL: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    filedb: {
        pathdb: './DB'
    },
    srv: {
        port: process.env.PORT,
        logger: process.env.LOG || 'DEV',
        persistencia: process.env.PERSISTENCIA
    }

}

module.exports = config