module.exports = {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/ecommerce'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://xxx:yyy@zzz,mongodb.net/coderhouse?retrywrites=true&w=majority'
    },
    firebase: {
        serviceAccount: './db/basefirebase-17f9c-firebase-adminsdk-e24we-18a617e251.json',
        databaseURL: "https://basefirebase-17f9c.com"
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    },
    archivos: {
        path: './DB'
    }
}