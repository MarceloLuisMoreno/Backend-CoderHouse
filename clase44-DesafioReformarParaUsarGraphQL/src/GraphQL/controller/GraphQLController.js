const {
  graphqlHTTP
} = require('express-graphql')
const {
  buildSchema
} = require('graphql')
const ProductosApi = require('../api/ProductosApi')
const MensajesApi = require('../api/MensajesApi')


const schema = buildSchema(`
  # Defino los Inputs: Producto y Mensaje
    input ProductoInput {
      title: String,
      price: Float,
      thumbnail: String,
      timestamp: String,
    }
  
    input AuthorInput{
      mail: String,
      nombre: String,
      apellido: String,
      edad: Int,
      alias: String,
      avatar: String 
    }
  
    input MensajeInput {
      author: AuthorInput,
      text: String,
      date: String
    }
  
  # Defino los types: Producto y Mensaje
    type Producto {
      id: ID!
      title: String,
      price: Float,
      thumbnail: String,
      timestamp: String
    }
  
    type Author {
        mail: String,
        nombre: String,
        apellido: String,
        edad: Int,
        alias: String,
        avatar: String
    }
  
    type Mensaje {
        author: Author,
        id: ID!,
        text: String,
        date: String,
    }
  
  # Defino los type Query y Mutation
    type Query {
      listarProductos: [Producto],
      listarProducto(id: ID!): Producto,
      listarMensajes: [Mensaje]
    }
    type Mutation {
      nuevoProducto(datos: ProductoInput): Producto
      nuevoMensaje(datos: MensajeInput): Mensaje
      actualizarProducto(id: ID!, datos: ProductoInput): Producto,
      deleteProducto(id: ID!): [Producto],

    }
  `);

module.exports = class GraphQLController {
  constructor() {
    const apiProductos = new ProductosApi()
    const apiMensajes = new MensajesApi()
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        nuevoProducto: apiProductos.nuevoProducto,
        listarProductos: apiProductos.listarProductos,
        listarProducto: apiProductos.listarProducto,
        actualizarProducto: apiProductos.actualizarProducto,
        deleteProducto: apiProductos.deleteProducto,
        listarMensajes: apiMensajes.listarMensajes,
        nuevoMensaje: apiMensajes.nuevoMensaje
      },
      graphiql: true,
    })
  }
}