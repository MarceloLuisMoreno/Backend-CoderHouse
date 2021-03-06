// SERVIDOR EXPRESS
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

// contenedor
const Contenedor = require('./Contenedor.js')

app.get('/productos', (req, res) => {
    // devuelve un array con todos los productos
    let contenedor = new Contenedor('./productos.txt')
    contenedor.getAll()
        .then(productos => {
            console.log(productos)
            res.send(productos)
        },
            err => res.json({ mssg: `ERROR: ${err}` })
        )
})

app.get('/productoRandom', (req, res) => {
    let contenedor = new Contenedor('./productos.txt')
    contenedor.getAll()
        .then(productos => {
            const aleatorio = (Math.floor(Math.random() * (productos.length - 1) + 1))
            console.log("PRODUCTO AL AZAR:", productos[aleatorio])
            res.send(productos[aleatorio])
        },
            err => res.json({ mssg: `ERROR: ${err}` })
        )
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
