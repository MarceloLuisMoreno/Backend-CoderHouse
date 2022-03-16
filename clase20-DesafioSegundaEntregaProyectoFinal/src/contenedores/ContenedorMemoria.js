// contenedor MEM

module.exports = class Contenedor {
    constructor() {
        this.listaElementos = []
    }

    getAll() {
        return this.listaElementos
    }

    saveAll(nuevaLista) {
        this.listaElementos.push(nuevaLista)
    }

    getById(id) {
        const buscado = this.listaElementos.find(b => b.id == id)
        if (!buscado) return null
        else return buscado
    }

    saveElement(elemento) {
        let newId = 1
        if (this.listaElementos.length > 0) newId = this.listaElementos[this.listaElementos.length - 1].id + 1
        const newTimestamp = new Date()
        const datos = {
            id: newId,
            timestamp: newTimestamp.toLocaleString()
        }
        const newElemento = {
            ...datos,
            ...elemento
        };
        this.listaElementos.push(newElemento)
        return this.listaElementos
    }

    deleteById(id) {
        const buscado = this.listaElementos.findIndex(o => o.id == id)
        if (buscado === -1) return void(0)
        else this.listaElementos.splice(buscado, 1)
        return this.listaElementos
    }
    deleteAll = () => this.listaElementos = []

    updateById(id, newElemento) {
        const index = this.listaElementos.findIndex(elemento => elemento.id == id)
        if (index != -1) {
            const {
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            } = newElemento;
            const newTimestamp = new Date()
            // Actualizo los datos:
            lista[index].timestamp = newTimestamp.toLocaleString();
            lista[index].nombre = nombre ? nombre : lista[index].nombre;
            lista[index].descripcion = descripcion ? descripcion : lista[index].descripcion;
            lista[index].codigo = codigo ? codigo : lista[index].codigo;
            lista[index].foto = foto ? foto : lista[index].foto;
            lista[index].precio = precio ? precio : lista[index].precio;
            lista[index].stock = stock ? stock : lista[index].stock;
            return void(0)
        } else {
            return null
        }
    }


    // Métodos únicamente para el carrito
    // ----------------------------------
    saveProductCart (id, newElemento) {
        // Desestructuración de las propiedades del nuevo producto:
        let carrito = this.getAll();
        const index = carrito.findIndex(idCarrito => idCarrito.id == id);
        if (index != -1) {
            // Incorporo el producto al carrito
            carrito[index].productos.push(newElemento)
            // Insertar el producto modificado en la lista:
            const newCart = JSON.stringify(carrito, null, 2);
            this.saveAll(newCart);
            return void(0)
        } else {
            return null
        }
    };

    deleteProductCart(id, idProd) {
        const buscado = this.getById(id)
        if (!buscado) return null
        else {
            let cart = this.getAll()
            const index = cart.findIndex(idCarrito => idCarrito.id == id);
            const indexProd = cart[index].productos.findIndex(idCarrito => idCarrito.id == idProd)
            if (indexProd != -1) {
                const newCart = cart[index].productos.filter(product => product.id != idProd)
                cart[index].productos = newCart
                const newCartJson = JSON.stringify(cart, null, 2)
                this.saveAll(newCartJson)
                return void(0)
            } else {
                return null
            }
        }
    }

}