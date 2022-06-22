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
        thumbnail
    } = data;
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;
    if (!title || !price || !thumbnail) {
        throw new Error("El producto debe tener los siguientes campos: Nombre, Precio, y URL-Foto.");
    }
    if (typeof price === 'string') {
        throw new Error("El precio debe ser un número mayor a 0.");
    }
    if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0.");
    }

    if (!caracteresValidos.exec(title)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(thumbnail)) {
        throw new Error("La foto sólo puede contener letras, números, y /");
    }
}

function validationMessage(data) {
    const {
        mail,
        nombre,
        apellido,
        edad,
        alias,
        avatar
    } = data;
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

    if (!mail || !nombre || !apellido || !edad || !alias || !avatar) {
        throw new Error("El mensaje debe tener los siguientes campos: Mail, Nombre, Apellido, Edad, Alias y Avatar.");
    }
    if (!caracteresValidos.exec(mail)) {
        throw new Error("El email sólo puede contener letras, números, y @.");
    }
    if (edad <= 14) {
        throw new Error("La edad debe ser mayor a 15 años.");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(apellido)) {
        throw new Error("El apellido sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(alias)) {
        throw new Error("El alias sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(avatar)) {
        throw new Error("El avatar sólo puede contener letras, números, y /");
    }
}


module.exports = {
    validate,
    validationProduct,
    validationMessage
}