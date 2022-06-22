const axios = require('axios')

const URL = 'http://localhost:8080/api/productos'

// Listado de todos los productos
async function getProd() {
    try {
        const response = await axios.get(URL)
        console.log(response.data)

    } catch (error) {
        console.log(error.response.data)
    }
}

getProd()


// Listado de 1 producto
async function getProducto(id) {
    try {
        const response = await axios.get(URL + `/${id}`)
        console.log(response.data)

    } catch (error) {
        console.log(error.response.data)
    }
}



getProducto(2)


// Grabo un producto nuevo
async function postProducto(data) {
    try {
        const response = await axios.post(URL, data)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)

    }
}

const producto = {
    title: "Pizarra para Niños",
    price: 2900,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png",
}

postProducto(producto)
getProd()

// Elimino un producto
async function delProducto(id) {
    try {
        const response = await axios.delete(URL + `/${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)

    }
}
delProducto(9)




// modificación  de un producto nuevo
async function putProducto(data) {
    try {
        console.log(URL + `/${data.id}`, data)
        const response = await axios.put(URL + `/${data.id}`, data)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)

    }
}

const producto1 = {
    id: 8,
    title: "Pizarra para Niñosssss",
    price: 3900,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png",
    timestamp: "6/6/2022 15:22:56"
}

putProducto(producto1)