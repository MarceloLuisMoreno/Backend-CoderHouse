const {
    promises: fs
} = require('fs');

module.exports = class ContenedorArchivo {
    constructor(file) {
        this.file = file
    }

    getAll = async () => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            const newLista = await  JSON.parse(lista)
            return newLista
        } catch (error) {
            return []
        }
    };


    saveAll = async (mensaje) => {
        const lista = await this.getAll();
        let newId = lista.length  + 1
        const newMensaje = { ...mensaje, id: newId };
        lista.push(newMensaje);
        const nuevaLista = JSON.stringify(lista, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return void(0)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    };
};