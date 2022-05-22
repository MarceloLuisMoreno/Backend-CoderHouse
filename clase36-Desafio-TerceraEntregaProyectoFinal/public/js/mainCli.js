/*=======[defino ruta endpoints]=======*/
let url = window.location.href
if (url.includes("localhost"))
    url = "http://localhost:8080"
else url = "https://coderhouserterceraentrega.herokuapp.com"


API_URLproductos = `${url}/api/productos/`
API_URLcarrito = `${url}/api/carrito/`

let cookieUsuario = document.cookie.replace('%40', '@')
let usuario = cookieUsuario.slice(5)

console.log(cookieUsuario,usuario)

//Leo y renderizo el catálogo de productos
fetch(API_URLproductos, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => renderProductos(response))

//Muestro - cierro  Datos Cliente
function verDatos() {
    document.getElementById("misDatos").hidden = false;
    location.href='#misDatos'
}
function salirDatos() {
    document.getElementById("misDatos").hidden = true;
}

//Muestro - cierro  Carritos Cliente
function verCarritos() {
    document.getElementById("carritos").hidden = false;
}
function salirCarritos() {
    document.getElementById("carritos").hidden = true;
    location.href='#carritos'
}


//Funcion render para inyectar los card de productos en el HTML
function renderProductos(data) {
    const html = data
        .map((elem, index) => {
            return `<div class="card mt-5 shadow p-3 mb-5 bg-white rounded">
                        <img class="card-img-top" src="${elem.foto}" alt="Card image cap" width="20px">
                        <div class="card-body">
                            <h5 class="card-title">Id:${elem._id}</h5>
                            <p class="card-text">${elem.nombre}</p>
                            <p class="card-text"><small>${elem.descripcion}</small></p>
                            <p class="card-text">Código: ${elem.codigo}</p>
                            <p class="card-text">Precio $ ${elem.precio}</p>
                            <p class="card-text">Stock: ${elem.stock}</p>
                        </div>
                        <button id="producto${elem._id}" class="btn btn-danger btn-sm text-center" onclick="agregoProdCart('${elem._id}')">Agregar Carrito</button>
                    </div>
                    `
        })
        .join(" ")
    document.getElementById("tableProducts").innerHTML = html
}


//Leo y renderizo carrito de compras cliente
fetch(API_URLcarrito + usuario + '/productos', {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if ( response.error === 400 ) {
            fetch(API_URLcarrito + `${usuario}`, {
                method: 'POST',
                })
        }
        renderCarrito(response)
    })

//Funcion render para inyectar los productos en el carrito HTML
function renderCarrito(data) {
    const html = data
        .map((elem, index) => {
            let html = `<div>
                    <div>
                        <h5 class="card-title">Carrito Cliente: ${elem.cliente}</h5>
                        <p class="card-text">Date: ${elem.timestamp}</p>
                    </div>
                    <div class="table-responsive">
                    <table class="table table-dark">
                        <tr style="color:white">
                            <th>Id</th>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Foto</th>
                        </tr>`
            elem.productos.map((prod, index) => {
                html += `<tr>
                        <td class="align-middle">
                            ${prod._id}
                        </td>
                        <td class="align-middle">
                            ${prod.codigo}
                        </td>
                        <td class="align-middle">
                            ${prod.nombre}
                        </td>
                        <td class="align-middle">
                            $ ${prod.precio}
                        </td>
                        <td class="align-middle">
                            <img src="${prod.foto}" width="50" >
                        </td>
                        <td class="align-middle">
                            <button id="carrito${elem.id}-${elem.id}" class="btn btn-danger btn-sm" onclick="eliminoProductoCarrito('${elem.cliente}','${prod._id}')">Eliminar</button>
                        </td>
                    </tr>`
            })
            html += `   </table>
                    </div>
                    <div class="card-footer">
                        <button id="prodcart${elem.id}" class="btn btn-primary mt-3" onclick="finalizaCompra('${elem.cliente}')">Finalizar Compra</button>
                        <button id="carrito${elem.id}"  class="btn btn-danger mt-3" onclick="eliminoCarrito('${elem.cliente}')">Eliminar Carrito</button>
                    </div>
                </div>
                <br>
                <hr>`
            return html
        })
        .join(" ")
    document.getElementById("carrito").innerHTML = html
}




//Funcion elimino productos Carrito
function eliminoProductoCarrito(idCarrito, idProd) {
    const params = `${idCarrito}/productos/${idProd}`
    fetch(API_URLcarrito + params, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => renderCarrito(response))
    window.location.reload()

}

//get de productos
async function fetchProd(params) {
    const response = await fetch(API_URLproductos + params, {
        method: 'GET',
    })
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const prod = await response.json()
    return prod
}

//Funcion agrego productos Carrito
async function agregoProdCart(produc) {
    const params = `${produc}`
    const producto = await fetchProd(params)
    const data = JSON.stringify(await producto)
    const params2 = `${usuario}/productos`
    if (data != null) {
        const response = await fetch(API_URLcarrito + params2, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: await data
        })
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
    }
    window.location.reload()
}

//Funcion elimino Carrito
function eliminoCarrito(idCarrito) {
    alert(`Elimino el carrito ${idCarrito}`)

    const params = `${idCarrito}`
    fetch(API_URLcarrito + params, {
            method: 'DELETE',
            body: JSON.stringify(`{id: ${idCarrito}}`)
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => renderCarrito(response))
    window.location.reload()
}

//Funcion Finaliza Compra
function finalizaCompra(idCarrito) {
    alert(`Cierre de compra  ${idCarrito}`)

    const params = `${idCarrito}/compra`
    fetch(API_URLcarrito + params, {
            method: 'POST',
            body: JSON.stringify(`{id: ${idCarrito}}`)
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => renderCarrito(response))
    window.location.reload()
}
