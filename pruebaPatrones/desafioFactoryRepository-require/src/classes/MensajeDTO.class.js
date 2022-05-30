class MensajeDTO {
    constructor(author, text, date, id) {
        this.id = id;
        this.mail = author.mail;
        this.nombre = author.nombre;
        this.apellido = author.apellido;
        this.edad = author.edad;
        this.alias = author.alias;
        this.avatar = author.avatar;
        this.text = text;
        this.date = date

    }

    getid() {
        return this.id;
    }

    setid(id) {
        return this.id = id;
    }

    gettitle() {
        return this.mail;
    }

    setmail(mail) {
        return this.mail = mail;
    }

    getnombre() {
        return this.nombre;
    }

    setnombre(nombre) {
        return this.nombre = nombre;
    }

    getapellido() {
        return this.apellido;
    }

    setapellido(apellido) {
        return this.apellido = apellido;
    }

    getedad() {
        return this.edad;
    }

    setedad(edad) {
        return this.edad = edad;
    }

    getalias() {
        return this.alias;
    }

    setalias(alias) {
        return this.alias = alias;
    }


    getavatar() {
        return this.avatar;
    }

    setavatar(avatar) {
        return this.avatar = avatar;
    }

    gettext() {
        return this.text;
    }

    settext(text) {
        return this.text = text;
    }

    getdate() {
        return this.date;
    }

    setdate(date) {
        return this.date = date;
    }

}

module.exports = MensajeDTO