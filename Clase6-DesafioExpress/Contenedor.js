const fs = require('fs')

module.exports = function Error(message){
    this.message = message;
}

module.exports = class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    async save(producto) {
        const objs = await this.getAll()
        let newId = 1
        if (objs.length > 0) newId = objs[objs.length - 1].id + 1
        const newObj = { ...producto, id: newId }
        objs.push(newObj)
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        }
        catch (error) {
            throw new Error(`Error al guardar archivo: ${error}`)
        }
    }

    async getById(id) {
        try { 
        const objs = await this.getAll()
        const buscado = objs.find(o => o.id == id)
        if (buscado === undefined) throw new Error(`No se encontró el Producto con id = ${id}`)
        return buscado
        }
        catch (err) { throw err }
        
    }

    async getAll() {
        try {
            const objs =  await fs.promises.readFile(this.ruta, 'utf-8')
            const objsRecuperados = JSON.parse(objs)
            return objsRecuperados
        }
        catch (err) { throw new Error(`Se produjo Error al leer archivo: ${err}`)}
    }

    async deleteById(id) {
        const objs = await this.getAll()
        const buscado = objs.findIndex(o => o.id == id)
        if (buscado === -1) throw new Error(`No se encontró el Producto con id = ${id}`)
        else objs.splice(buscado, 1)
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2), (reject, resolve) => {
            if (reject) { throw new Error(`No se pudo eliminar los objetos del archivo. ${reject}`) }
            return void (0)
        })
    }

    async deleteAll() {
        try {
            const objs = []
            await fs.promises.writeFile(this.ruta, `${JSON.stringify(objs, null, 2)}\n`)
            return void (0)
        } catch (error) { throw new Error(`No se pudo eliminar los objetos del archivo. ${error}`) }
    }

}