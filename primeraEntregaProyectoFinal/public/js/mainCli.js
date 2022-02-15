const API_URLproductos = 'http://localhost:8080/api/productos/'
const API_URLcarrito = 'http://localhost:8080/api/carrito/'

//Leo y renderizo el catálogo de productos
fetch(API_URLproductos, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => renderProductos(response))

//Funcion render para inyectar los card de productos en el HTML
function renderProductos(data) {
    const html = data
        .map((elem, index) => {
            return `<div class="card">
                        <img class="card-img-top" src="${elem.foto}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Id:${elem.id}  ${elem.nombre}</h5>
                            <p class="card-text">Date: ${elem.timestamp}</p>
                            <p class="card-text">${elem.descripcion}</p>
                            <p class="card-text">Código: ${elem.codigo}</p>
                            <p class="card-text">Precio $ ${elem.precio}</p>
                            <p class="card-text">Stock: ${elem.stock}</p>
                        </div>
                    </div>
                    `
        })
        .join(" ")
    document.getElementById("tableProducts").innerHTML = html
}


//Leo y renderizo los carritos de compras
fetch(API_URLcarrito, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => renderCarrito(response))

//Funcion render para inyectar los card de productos en el HTML
function renderCarrito(data) {
    const html = data
        .map((elem, index) => {
            let html = `<div>
                        <div>
                            <h5 class="card-title">Carrito Id:${elem.id}</h5>
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
                                ${prod.id}
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
                                <button id="carrito${elem.id}-${elem.id}" class="btn btn-danger btn-sm" onclick="eliminoProductoCarrito(${elem.id},${prod.id})">Eliminar</button>
                            </td>
                        </tr>`
            })
            html += `   </table>
                        </div>
                        <div>
                            <label for="id"><b>Agregar Producto al carrito ${elem.id} - Ingresar Id del Producto: </b></label>
                            <input id="id${elem.id}" type="number" name="id" required="required" />
                            <button id="prodcart${elem.id}" name="delete" class="btn btn-primary btn-sm" onclick="agregoProdCart(${elem.id})">Agregar Producto</button>
                        </div>
                        <div class="card-footer">
                            <button id="carrito${elem.id}" name="delete" class="btn btn-danger mt-3" onclick="eliminoCarrito(${elem.id})">Eliminar Carrito ${elem.id}</button>
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
    alert(`Elimino del carrito ${idCarrito} el  Producto id: ${idProd}`)
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
async function agregoProdCart(idCarrito) {
    const idProd = document.getElementById(`id${idCarrito}`).value
    const params = `${idProd}`
    const producto = await fetchProd(params)
    const params2 = `${idCarrito}/productos`
    const data = JSON.stringify(await producto)
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
