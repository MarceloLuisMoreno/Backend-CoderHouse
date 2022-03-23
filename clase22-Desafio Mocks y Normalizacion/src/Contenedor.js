module.exports = class Contenedor {
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
            return {
                status: `Error read producto id: ${id}`,
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
            console.log(err)
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
            return {
                status: "Error delete database.",
                message: err.message,
            }
        }
    }

    async updateById(id,item) {
        const knex = require('knex')(this.database)
        try {
            const deleted = await knex.update(item).table(this.table).where("id", id)
            if (!deleted) throw new Error("Product update error.")
            return {
                status: 'success',
                payload:'Product has been updated successfully.',
            }
        } catch (err) {
            return {
                status: "Error update element.",
                message: err.message,
            }
        }
    }
}