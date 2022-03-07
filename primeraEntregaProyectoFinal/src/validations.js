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
    const caracteresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú:/\s]+$/;
    if (!nombre || !descripcion || !codigo || !precio || !foto || !stock) {
        throw new Error("El producto debe tener los siguientes campos: Nombre, Descripción, Código, Precio, URL-Foto y stock.");
    }
    if (precio <= 0) {
        throw new Error("El precio debe ser mayor a 0");
    }
    if (!caracteresValidos.exec(nombre)) {
        throw new Error("El nombre solo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(descripcion)) {
        throw new Error("La descripción solo puede contener letras, números y espacios");
    }
    if (!caracteresValidos.exec(foto)) {
        throw new Error("La foto solo puede contener letras, números, y /");
    }
    if (stock < 0) {
        throw new Error("El Stock debe ser mayor o igual a 0");
    }

}

module.exports = { validate, validationProduct }