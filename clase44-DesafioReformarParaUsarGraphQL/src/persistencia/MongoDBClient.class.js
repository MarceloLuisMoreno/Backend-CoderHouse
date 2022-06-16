const CustomError = require("../classes/CustomError.class.js")
const DBClient = require("../classes/DBClient.class.js")
const config = require("../config/config")
const mongoose = require("mongoose")
const logger = require("../loggers/logger")

module.exports = class MongoDBClient extends DBClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }

    async connect() {
        try {
            await this.client.connect(config.mongodb.connstr, config.mongodb.options);
            this.connected = true;

            logger.info('Base de datos conectada');
        } catch (error) {
            throw new CustomError(500, "Error al conectarse a mongodb", error);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close();
            this.connected = false;

            logger.info('Base de datos desconectada');
        } catch (error) {
            throw new CustomError(500, "Error al desconectarse a mongodb", error);
        }
    }
}