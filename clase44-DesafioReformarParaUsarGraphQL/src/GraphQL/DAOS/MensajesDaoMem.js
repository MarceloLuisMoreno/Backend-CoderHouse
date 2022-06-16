module.exports = class MensajesDao {
    constructor() {
        this.mensajes = []
    }

    listarmensajes() {
        return this.mensajes;
    }

    guardarMensaje(mensaje) {
        this.mensajes.push(mensaje)
    }

}