const {
    promises: fs
} = require('fs');

module.exports = class Contenedor {
    constructor(file) {
        this.file = file
    }

    getAll = async () => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            return JSON.parse(lista)
        } catch (error) {
            return []
        }
    };


    saveAll = async (mensaje) => {
        const lista = await this.getAll();
        let newId = 1
        if (lista.length > 0) {
            newId = lista[lista.length - 1].id + 1
        };
        const newMensaje = { ...mensaje, id: newId };
        lista.push(newMensaje);
        const nuevaLista = JSON.stringify(lista, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return void(0)
        } catch (error) {
            throw new Error(`Error al guardar lista: ${error}`)
        }
    };
};