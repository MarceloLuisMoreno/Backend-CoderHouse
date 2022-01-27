// contenedor

module.exports = class Contenedor {
    constructor() {
        this.listaProductos = []
    }

    getAll() {
        return this.listaProductos
    }
    
    save(newProduct) {
        let id = 1
        if (this.listaProductos.length > 0) id = this.listaProductos[this.listaProductos.length - 1].id + 1
        this.listaProductos.push( {...newProduct, id:id})
        return this.listaProductos
    }

    getById(id) {
        const buscado = this.listaProductos.find(b => b.id == id)
        return buscado
    }

    deleteById(id) {
        const buscado = this.listaProductos.findIndex(o => o.id == id)
        if (buscado === -1) return void (0)
        else this.listaProductos.splice(buscado, 1)
        return this.listaProductos
    }

    modifyById(producto) {
        const buscado = this.listaProductos.findIndex(o => o.id == producto.id)
        if (buscado === -1) return void (0)
        this.listaProductos[buscado].title = producto.title
        this.listaProductos[buscado].price = producto.price
        this.listaProductos[buscado].thumbnail = producto.thumbnail
        return this.listaProductos
    }
}
