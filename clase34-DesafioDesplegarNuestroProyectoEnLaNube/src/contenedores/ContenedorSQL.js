const logger = require('../loggers/logger')

module.exports = class ContenedorSql {
    constructor(database, table) {
        this.database = database
        this.table = table
    }

    async getAll() {
        const knex = require('knex')(this.database)
        try {
            const lista = await knex.select("*").table(this.table)
            return {
                status: 'success',
                payload: lista,
            }
        } catch (err) {
            logger.error(`Error read database, : ${err.message}`)
            return {
                status: "Error read database.",
                message: err.message,
            }
        }
    }

    async getById(id) {
        const knex = require('knex')(this.database)
        try {
            const buscado = await knex.select().table(this.table).where("id", id)
            if (!buscado) throw new Error("Product not found.")
            return {
                status: 'success',
                payload: buscado,
            }
        } catch (err) {
            logger.error(`Error read product id: ${id}`)
            return {
                status: `Error read product id: ${id}`,
                message: err.message,
            }
        }
    }

    async saveProduct(item) {
        const knex = require('knex')(this.database)
        try {
            await knex(this.table).insert(item)
            return {
                status: 'success',
                payload: `Product has been created successfully.`,
            }
        } catch (err) {
            logger.error(`Error save product: ${err.message}`)
            return {
                status: "Error save.",
                message: err.message,
            }
        }
    }

    async deleteById(id) {
        const knex = require('knex')(this.database)
        try {
            const deleted = await knex.del().table(this.table).where("id", id)
            if (!deleted) throw new Error("Product delete error.")
            return {
                status: 'success',
                payload:'Product has been created successfully.',
            }
        } catch (err) {
            logger.error(`Error delete element: ${err.message}`)
            return {
                status: "Error delete element.",
                message: err.message,
            }
        }
    }

    async deleteAll() {
        const knex = require('knex')(this.database)
        try {
            const deleted = await knex.del().table(this.table)
            if (!deleted) throw new Error("Delete database error.")
            return {
                status: 'success',
                payload:'Database has been deleted successfully.',
            }
        } catch (err) {
            logger.error(`Error delete database: ${err.message}`)
            return {
                status: "Error delete database.",
                message: err.message,
            }
        }
    }

    async updateById(id,item) {
        const knex = require('knex')(this.database)
        try {
            const modificado = await knex.update(item).table(this.table).where("id", id)
            if (!modificado) throw new Error("Product update error.")
            return {
                status: 'success',
                payload:'Product has been updated successfully.',
            }
        } catch (err) {
            logger.error(`Error update element: ${err.message}`)
            return {
                status: "Error update element.",
                message: err.message,
            }
        }
    }
}