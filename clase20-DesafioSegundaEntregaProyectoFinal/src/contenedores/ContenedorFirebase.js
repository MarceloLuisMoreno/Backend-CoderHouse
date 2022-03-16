module.exports = class ContenedorMongo {
    constructor(coleccion) {
        this.coleccion = coleccion
    }

    getAll = async () => {
        try {
            const lista = await this.coleccion.get()
            let docs = lista.docs
            const response = docs.map((doc) =>(
            {
                id: doc.id,
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock
            }))
            return response
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    };

    saveAll = async (nuevaLista) => {
        try {
            const newLista = new this.coleccion(nuevaLista)
            await newLista.save();
        } catch (error) {
            throw error
        }
    };

    getById = async (id) => {
        try {
            const doc = this.coleccion.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (error) {
            throw new Error(`Error al listar id: ${error}`)
        }
    };

    saveElement = async (elemento) => {
        try {
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            const newElemento = {
                ...elemento,
                timestamp
            };
            let id=1
            const doc = this.coleccion.doc(`${id}`)
            await doc.create(newElemento)
            return newElemento
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };


    deleteById = async (id) => {
        try {
            const doc = this.coleccion.doc(`${id}`)
            const item = await doc.deleteOne()
            return void(0)
        } catch (error) {
            throw new Error(`Error al borrar id: ${error}`)
        }
    }

    updateById = async (id, newElemento) => {
        try {
            const {
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            } = newElemento;
            const newTimestamp = new Date()
            const timestamp = newTimestamp.toLocaleString()
            await this.coleccion.updateOne({
                _id: id
            }, {
                $set: {
                    timestamp: timestamp,
                    nombre: nombre,
                    description: descripcion,
                    codigo: codigo,
                    foto: foto,
                    precio: precio,
                    stock: stock
                }
            })
            return void(0)
        } catch (error) {
            throw new Error(`Error al actualizar id: ${error}`)
        }
    };

    // Métodos únicamente para el carrito
    // ----------------------------------
    saveProductCart = async (id, newProduct) => {
        try {
            let carrito = await this.getById(id)
            carrito.productos = push(newProduct)
            const newElement = new this.Modelo(carrito)
            await this.coleccion.updateOne({
                _id: id
            }, { newElement })
            return void(0)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };

    deleteProductCart = async (id, idProd) => {
/*         try {
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
            throw new Error(`Error al borrar: ${error}`)
        }
 */    }

}