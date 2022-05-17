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
        nombre,
        descripcion,
        codigo,
        precio,
        foto,
        stock
    } = data;
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

    if (!nombre || !descripcion || !codigo || !precio || !foto || !stock) {
        throw new Error("El producto debe tener los siguientes campos: Nombre, Descripción, Código, Precio, URL-Foto y stock.");
    }
    if (precio <= 0) {
        throw new Error("El precio debe ser mayor a 0");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(descripcion)) {
        throw new Error("La descripción sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(foto)) {
        throw new Error("La foto sólo puede contener letras, números, y /");
    }
    if (!caracteresValidos.exec(codigo)) {
        throw new Error("El código sólo puede contener números.");
    }
    if (stock < 0) {
        throw new Error("El Stock debe ser mayor o igual a 0");
    }
}

function validationUsuario(data) {
    const {
        email,
        nombre,
        direccion,
        edad,
        celular,
        avatar
    } = data;
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

    if (!nombre || !email || !direccion || !edad || !celular || !avatar) {
        throw new Error("El Usuario debe tener los siguientes campos: Nombre, email, dirección, edad, celular y URL-avatar.");
    }
    if (edad <= 17) {
        throw new Error("La edad debe ser mayor a 17 años.");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(direccion)) {
        throw new Error("La dirección sólo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(avatar)) {
        throw new Error("La URL-foto avatar sólo puede contener letras, números, y /");
    }
    if (!caracteresValidos.exec(celular)) {
        throw new Error("El celular sólo puede contener números.");
    }
}


module.exports = {
    validate,
    validationProduct,
    validationUsuario
}