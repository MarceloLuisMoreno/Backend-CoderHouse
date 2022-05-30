import ProductoController from "./src/controllers/Producto.controller.js";
import MensajeController from "./src/controllers/Mensaje.controller.js"

const obj = ProductoController;
const objMsj = MensajeController;


console.log('LISTADO DE TODAS LAS PRODUCTOS ORIGINALES:')
console.log(await obj.listarAll());
/*await obj.guardar({
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
});


await obj.guardar({
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
});
await obj.guardar({
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "id": 3
});

await obj.guardar({
    "title": "Cuarderno tapa dura",
    "price": "280",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png",
    "id": 4
});

await obj.guardar({
    "title": "Pizarra para Niños",
    "price": "2900",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png",
    "id": 5
});
await obj.guardar({
    "title": "Acuarelas con pincel",
    "price": "210",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png",
    "id": 6
});


console.log('BORRO TODO')
console.log(await obj.borrarAll())

console.log('LISTADO DE TODOS LOS PRODUCTOS......:')
*/
console.log(await obj.listarAll());

console.log('LIstado de un id: ')
console.log(await obj.listar('1'));

// =========== Listar con DTOs
console.log('LISTADO CON DTOs: ')
console.log(await obj.listarAll());
console.log(await obj.listar('1'));


/* await objMsj.guardar({
    "author": {
        "mail": "marceloluismoreno@gmail.com",
        "nombre": "Marcelo Luis",
        "apellido": "MORENO",
        "edad": "52",
        "alias": "mlm",
        "avatar": "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png"
    },
    "text": "Hola probando!!!",
    "date": "23/3/2022, 0:08:44",
    "id": 1
});

await objMsj.guardar({
    "author": {
        "mail": "j@m",
        "nombre": "Juan",
        "apellido": "Martinez",
        "edad": "38",
        "alias": "JM",
        "avatar": "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-256.png"
    },
    "text": "Probando!!!",
    "date": "28/3/2022, 16:55:48",
    "id": 11
})

 */



// ============== listar todos los mensajes
console.log('LISTADO DE TODOS LOS MENSAJES:')
console.log(await objMsj.listarAll());