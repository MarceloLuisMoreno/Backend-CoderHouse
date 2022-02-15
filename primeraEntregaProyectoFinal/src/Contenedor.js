const { promises: fs } = require('fs');

module.exports = class Contenedor {
    constructor(file) { this.file = file }

    getAll = async () => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            return JSON.parse(lista)
        } catch (err) {
            return []
        }
    };

    saveList = async (nuevaLista) => {
            await fs.writeFile(this.file, nuevaLista);
    };

    getById = async (id) => {
            const lista = await this.getAll();
            const buscado = lista.find(product => product.id == id);
            return buscado
    };

    saveProduct = async (product) => {
        const lista = await this.getAll();
        let newId = 1
        if (lista.length > 0) {
            newId = lista[lista.length - 1].id + 1
        };
        const newTimestamp = new Date()
        const datos = {
            id: newId,
            timestamp: newTimestamp.toLocaleString()
        }
        const newProduct = { ...datos, ...product };
        lista.push(newProduct);
        const nuevaLista = JSON.stringify(lista, null, 2);
        await this.saveList(nuevaLista);
        return product.id
    };

    deleteById = async (id) => {
        const buscado = await this.getById(id)
        if (!buscado) return null
        else {
            const lista = await this.getAll()
            const nuevaLista = lista.filter(product => product.id != id)
            const nuevaListaJson = JSON.stringify(nuevaLista, null, 2)
            await this.saveList(nuevaListaJson)
            return void (0)
        }
    }

    updateById = async (id, newProduct) => {
        // Desestructuración de las propiedades del nuevo producto:
        let lista = await this.getAll();
        const index = lista.findIndex(product => product.id == id);
        if (index != -1) {
            const { nombre, descripcion, codigo, foto, precio, stock } = newProduct;
            const newTimestamp = new Date()
            // Actualizo los datos:
            lista[index].timestamp = newTimestamp.toLocaleString();
            lista[index].nombre = nombre;
            lista[index].descripcion = descripcion;
            lista[index].codigo = codigo;
            lista[index].foto = foto;
            lista[index].precio = precio;
            lista[index].stock = stock;
            // Insertar el producto modificado en la lista:
            const nuevaListaJson = JSON.stringify(lista, null, 2);
            await this.saveList(nuevaListaJson);
            return void (0)
        } else {
            return null
        }
    };

    deleteAll = () => this.saveList('[]');
    
    // Métodos únicamente para el carrito
    saveCart = async (id, newProduct) => {
        // Desestructuración de las propiedades del nuevo producto:
        let carrito = await this.getAll();
        const index = carrito.findIndex(idCarrito => idCarrito.id == id);
        if (index != -1) {
            // Incorporo el producto al carrito
            carrito[index].productos.push( newProduct )
            // Insertar el producto modificado en la lista:
            const newCart = JSON.stringify(carrito, null, 2);
            await this.saveList(newCart);
            return void (0)
        } else {
            return null
        }
    };

    deleteCartByIdProd = async (id, idProd) => {
        const buscado = await this.getById(id)
        if (!buscado) return null
        else {
            let cart = await this.getAll()
            const index = cart.findIndex(idCarrito => idCarrito.id == id);
            const indexProd = cart[index].productos.findIndex(idCarrito => idCarrito.id == idProd)
            if ( indexProd != -1 ) {
            const newCart = cart[index].productos.filter(product => product.id != idProd)
            cart[index].productos = newCart
            const newCartJson = JSON.stringify(cart, null, 2)
            await this.saveList(newCartJson)
            return void (0)
            }else{
                return null
            }
        }
    }

};

