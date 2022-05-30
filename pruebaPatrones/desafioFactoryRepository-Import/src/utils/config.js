import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env);

const config = {
    mongodb: {
        connstr: process.env.MONGO_URL_LOCAL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
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

export default config;