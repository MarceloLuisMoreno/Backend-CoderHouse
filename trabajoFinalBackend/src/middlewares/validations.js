function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
}

function validationProduct(data) {
    const {
        title,
        price,
        thumbnail,
        category
    } = data;
    const caracteresValidos = /^[a-zA-Z@/.0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;
    if (!title || !price || !thumbnail || !category) {
        throw new Error("El producto debe tener los siguientes campos: title, price, thumbnail y category.");
    }
    if (typeof price === 'string') {
        throw new Error("El precio debe ser un número mayor a 0.");
    }
    if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0.");
    }
    if (!caracteresValidos.exec(title)) {
        throw new Error("El title sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(thumbnail)) {
        throw new Error("La thumbnail sólo puede contener letras, números, y /");
    }
    if (!caracteresValidos.exec(category)) {
        throw new Error("La category sólo puede contener letras, números, y /");
    }

}

function validationMessage(data) {
    const {
        mail,
        nombre,
        direccion,
        edad,
        celular,
        avatar
    } = data.author;
    const {
        emailpara,
        tipo,
        text,
        date
    } = data
    const caracteresValidos = /^[a-zA-Z@/.0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

    if (!mail || !nombre || !direccion || !edad || !avatar || !celular || !emailpara || !tipo || !text || !date) {
        throw new Error("El mensaje debe tener los siguientes campos: Mail, Nombre, Direccion, Edad, Celular , Emailpara, texto y Avatar.");
    }
    if (!caracteresValidos.exec(mail)) {
        throw new Error("El email sólo puede contener letras, números, y @.");
    }
    if (edad <= 17) {
        throw new Error("La edad debe ser mayor a 17 años.");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(direccion)) {
        throw new Error("El direccion sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(celular)) {
        throw new Error("El celular sólo puede contener letras, números y espacios");
    }
    if (tipo != 'sistema' && tipo != 'usuario') {
        throw new Error("El tipo sólo puede -sistema- o -usuario-");
    }
    if (!caracteresValidos.exec(text)) {
        throw new Error("El text sólo puede contener letras, números, y /");
    }
    if (!caracteresValidos.exec(date)) {
        throw new Error("El date sólo puede contener letras, números, y /");
    }
    if (!caracteresValidos.exec(emailpara)) {
        throw new Error("El emailpara sólo puede contener letras, números, y /");
    }


}

function validationUsuario(data) {
    const {
        timestamp,
        email,
        nombre,
        direccion,
        edad,
        celular,
        avatar,
        password
    } = data;
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

    if (!timestamp || !email || !nombre || !direccion || !apellido || !edad || !celular || !avatar || !password) {
        throw new Error("El mensaje debe tener los siguientes campos: Timestamp, Email, Nombre, Direccion, Edad, celular, Avatar y password.");
    }
    if (!caracteresValidos.exec(email)) {
        throw new Error("El email sólo puede contener letras, números, y @.");
    }
    if (edad <= 17) {
        throw new Error("La edad debe ser mayor a 17 años.");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(direccion)) {
        throw new Error("El direccion sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(edad)) {
        throw new Error("El edad sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(avatar)) {
        throw new Error("El avatar sólo puede contener letras, números, y /");
    }
}


module.exports = {
    validate,
    validationProduct,
    validationMessage,
    validationUsuario
}