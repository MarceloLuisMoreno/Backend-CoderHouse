module.exports = class ProductosDao {
    constructor() {
        this.productos = []
    }

    listarProductos() {
        return this.productos;
    }

    listarProducto(id) {
        const index = this.productos.findIndex(r => r.id == id)
        if (index == -1) {
            throw new Error('Producto not found')
        }
        return this.productos[index]
    }

    saveProducto(producto) {
        this.productos.push(producto)
    }

    updateProducto(id, campos) {
        const index = this.productos.findIndex(r => r.id == id)
        if (index == -1) {
            throw new Error('Producto not found')
        }
        const productoActualizado = {
            ...this.productos[index],
            ...campos
        }
        this.productos[index] = productoActualizado
        return productoActualizado
    }

    deleteProducto(id) {
        let i = 0
        const deleted = []
        while (i < this.productos.length) {
            if (this.productos[i]["id"] == id) {
                deleted.push(this.productos.splice(i, 1)[0])
            } else {
                i++
            }
        }
        return deleted
    }
}