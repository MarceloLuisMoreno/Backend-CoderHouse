const knexMySQL = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'productsdb'
    }
}

const knex = require('knex')(knexMySQL)
//Creo la tabla de productos en cliente: mysql Database: productsdb, si no está creada.
knex.schema.hasTable('products')
    .then(result => {
        if (!result) {
            knex.schema.createTable('products', table => {
                table.increments('id', {
                    primaryKey: true
                });
                table.string('title').notNullable();
                table.string('thumbnail').notNullable();
                table.float('price').notNullable();
            }).then(result => {
                console.log('Products table created successfully.')
            }).finally(() => {
                knex.destroy() //cierra la consulta
            })
        }
    })


module.exports = {
    knexMySQL
}