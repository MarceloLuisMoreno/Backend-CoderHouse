const { promises: fs } = require('fs');

module.exports = class Contenedor {
    constructor(file) { this.file = file }

    getAll = async () => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            return JSON.parse(lista)
        } catch (error) {
            return []
        }
    };

    getById = async id => {
        const lista = await this.getAll();
        const buscado = lista.find(product => product.id == id);
        return buscado
    };

    saveProduct = async product => {
        const lista = await this.getAll();
        let newId = 1
        if (lista.length > 0) {
            newId = lista[lista.length - 1].id + 1
        };
        const newProduct = { ...product, id: newId };
        lista.push(newProduct);
        const nuevaLista = JSON.stringify(lista, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return newId
        } catch (error) {
            throw new Error(`Error al guardar lista: ${error}`)
        }
    };
};

