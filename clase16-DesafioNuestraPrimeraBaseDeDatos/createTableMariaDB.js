const { options} = require ('./options/dbMySQL.js')
const knex = require ('knex')(options);

//se crea la tabla es un generador de consulta y lo traduce a mysql

knex.schema.createTable('products', table => {
    table.increments('id', { primaryKey: true }),
    table.string('title', { length: 15 }).notNullable(),
    table.string('thumbnail'); 
    table.decimal('price');
  }).then(()=> {
      console.log('Table products created OK.')
  }).catch((err)=>{
      console.log(err)
      throw err 
  }).finally(() => {
      knex.destroy(); 
  })
  