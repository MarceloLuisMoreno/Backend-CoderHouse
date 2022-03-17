// contenedor ARCHIVO

const {
    promises: fs
} = require('fs');

module.exports = class ContenedorArchivo {
    constructor(path, archivo) {
        this.file = `${path}/${archivo}.json`
    }

    getAll = async () => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            if (!lista) {
                return null
            }
            return JSON.parse(lista)
        } catch (error) {
            throw error
        }
    };

    saveAll = async (nuevaLista) => {
        try {
            await fs.writeFile(this.file, nuevaLista);
        } catch (error) {
            throw error
        }
    };

    getById = async (id) => {
        try {
            const lista = await this.getAll()
                .then((resolve) => resolve)
                .catch((error) => {
                    throw error
                })
            const buscado = lista.find(registro => registro.id == id);
            if (!buscado) return null
            else return buscado
        } catch (error) {
            throw error
        }
    };

    saveElement = async (elemento) => {
        try {
            const lista = await this.getAll()
                .then((resolve) => resolve)
                .catch((error) => {
                    throw error
                })
            let newId = 1
            if (lista.length > 0) {
                newId = lista[lista.length - 1].id + 1
            };
            const newTimestamp = new Date()
            const datos = {
                id: newId,
                timestamp: newTimestamp.toLocaleString()
            }
            const newElemento = {
                ...datos,
                ...elemento
            };
            lista.push(newElemento);
            const nuevaLista = JSON.stringify(lista, null, 2);
            await this.saveAll(nuevaLista);
            return newId
        } catch (error) {
            throw error
        }
    };


    deleteById = async (id) => {
        try {
            const lista = await this.getAll()
                .then((resolve) => resolve)
                .catch((error) => {
                    throw error
                })
            const nuevaLista = lista.filter(elemento => elemento.id != id)
            const nuevaListaJson = JSON.stringify(nuevaLista, null, 2)
            await this.saveAll(nuevaListaJson)
            return void(0)
        } catch (error) {
            throw error
        }
    }

    deleteAll = () => this.saveAll('[]');

    updateById = async (id, newElemento) => {
        try {
            let lista = await this.getAll()
                .then((resolve) => resolve)
                .catch((error) => {
                    throw error
                })
            const index = lista.findIndex(elemento => elemento.id == id);
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
                // Insertar el producto modificado en la lista:
                const nuevaListaJson = JSON.stringify(lista, null, 2);
                await this.saveAll(nuevaListaJson);
                return void(0)
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    };

    // Métodos únicamente para el carrito
    // ----------------------------------
    saveProductCart = async (id, newProduct) => {
        try {
            // Desestructuración de las propiedades del nuevo producto:
            let carrito = await this.getAll()
                .then((resolve) => resolve)
                .catch((error) => {
                    throw error
                })
            const index = carrito.findIndex(idCarrito => idCarrito.id == id);
            if (index != -1) {
                // Incorporo el producto al carrito
                carrito[index].productos.push(newProduct)
                // Insertar el producto modificado en la lista:
                const newCart = JSON.stringify(carrito, null, 2);
                await this.saveAll(newCart);
                return void(0)
            } else {
                throw new Error("Carrito no existe.")
            }
        } catch (error) {
            throw error
        }
    };

    deleteProductCart = async (id, idProd) => {
        try {
            const buscado = await this.getById(id)
            if (!buscado) return null
            else {
                let cart = await this.getAll()
                const index = cart.findIndex(idCarrito => idCarrito.id == id);
                const indexProd = cart[index].productos.findIndex(idCarrito => idCarrito.id == idProd)
                if (indexProd != -1) {
                    const newCart = cart[index].productos.filter(product => product.id != idProd)
                    cart[index].productos = newCart
                    const newCartJson = JSON.stringify(cart, null, 2)
                    await this.saveAll(newCartJson)
                    return void(0)
                } else {
                    return null
                }
            }
        } catch (error) {
            throw error
        }
    }

}