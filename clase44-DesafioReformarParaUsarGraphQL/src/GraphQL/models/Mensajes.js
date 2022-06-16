module.exports = class Mensaje {
    constructor(id, {
        author,
        text,
        date
    }) {
        this.author = {
            mail: author.mail,
            nombre: author.nombre,
            apellido: author.apellido,
            edad: author.edad,
            alias: author.lias,
            avatar: author.avatar
        }
        this.text = text;
        this.date = date;
        this.id = id;
    }
}