const express = require("express")
//  Normalizr 
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
const util = require('util')


let messages = {
    id: "mensajes",
    mensajes: [{
            author: {
                mail: "m@m",
                nombre: "Marcelo Luis",
                apellido: "Moreno",
                edad: 53,
                alias: "mlm",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            },
            text: "Hola",
            date: "20/03/2022",
            id: 1
        },
        {
            author: {
                mail: "m@m",
                nombre: "Marcelo Luis",
                apellido: "Moreno",
                edad: 53,
                alias: "mlm",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            },
            text: "Hola",
            date: "20/03/2022",
            id: 2
        },
        {
            author: {
                mail: "m@m",
                nombre: "Marcelo Luis",
                apellido: "Moreno",
                edad: 53,
                alias: "mlm",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            },
            text: "Hola",
            date: "20/03/2022",
            id: 3
        },
        {
            author: {
                "mail": "m@m",
                nombre: "Marcelo Luis",
                apellido: "Moreno",
                edad: 53,
                alias: "mlm",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            },
            text: "Hola",
            date: "20/03/2022",
            id: 4
        },
        {
            author: {
                mail: "marceloluismoreno@gmail.com",
                nombre: "Marcelo Luis",
                apellido: "MORENO",
                edad: "52",
                alias: "mlm",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png"
            },
            text: "Esto es una prueba.",
            date: "20/03/2022",
            id: 5
        },
        {
            author: {
                mail: "miguel@gmail.com",
                nombre: "Miguel",
                apellido: "Juarez",
                edad: "30",
                alias: "Migue",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
            },
            text: "Necesito 100 calculadoras.",
            date: "20/03/2022",
            id: 6
        },
        {
            author: {
                mail: "miguel@gmail.com",
                nombre: "Miguel",
                apellido: "Juarez",
                edad: "30",
                alias: "Migue",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
            },
            text: "Pasar cotización urgente!!!",
            date: "20/03/2022",
            id: 7
        },
        {
            author: {
                mail: "pedro@gmail.com",
                nombre: "Pedro",
                apellido: "Morales",
                edad: "40",
                alias: "pedrito",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png"
            },
            text: "Buenos días!!!",
            date: "20/03/2022",
            id: 8
        },
        {
            author: {
                mail: "pedro@gmail.com",
                nombre: "Pedro",
                apellido: "Morales",
                edad: "40",
                alias: "pedrito",
                avatar: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png"
            },
            text: "Tienen 1000 cuadernos tapa dura ?",
            date: "20/03/2022",
            id: 9
        }
    ]
}


//author
const schemaAuthor = new schema.Entity('author', {}, {
    idAttribute: 'mail'
})
// Mensaje
const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })

// Mensajes
const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })


function print(obj) {
    console.log(util.inspect(obj, true, 12, true))
}

const normalizedData = normalize(messages, schemaMensajes);
console.log("messages");
print(messages);
console.log("********************normalizedData"); 
print(normalizedData);


const denormalizedData = denormalize(normalizedData.result, schemaMensajes, normalizedData.entities)
console.log("********************denormalizedData"); 
print(denormalizedData);

const longO = JSON.stringify(messages).length
const longN = JSON.stringify(normalizedData).length
const longD = JSON.stringify(denormalizedData).length

console.log('\nLongitud objeto original: ', longO)
console.log('\nLongitud objeto normalizado: ', longN)
console.log('\nLongitud objeto desnormalizado: ', longD)

const porcentaje = (longN*100)/longO
console.log(`\nPorcentaje Optimizado: ${porcentaje.toFixed(2)} %`);

console.log(denormalizedData.mensajes)