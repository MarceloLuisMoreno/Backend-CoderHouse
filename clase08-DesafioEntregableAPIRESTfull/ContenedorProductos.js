// contenedor

module.exports = class Contenedor {
    constructor(listaProductos) {
        this.listaProductos = listaProductos
    }

    save(title, price, thumbnail) {
        let id = 1
        if (this.listaProductos.length > 0) id = this.listaProductos[this.listaProductos.length - 1].id + 1
        this.listaProductos.push({ 'title': title, 'price': price, 'thumbnail': thumbnail, 'id': id })
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

    modifyById(id, title, price, thumbnail) {
        const buscado = this.listaProductos.findIndex(o => o.id == id)
        if (buscado === -1) return void (0)
        this.listaProductos[buscado].title = title
        this.listaProductos[buscado].price = price
        this.listaProductos[buscado].thumbnail = thumbnail
        return this.listaProductos
    }
}
