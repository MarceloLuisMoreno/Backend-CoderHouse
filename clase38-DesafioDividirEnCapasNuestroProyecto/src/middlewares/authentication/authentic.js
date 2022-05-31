//Función para autenticar que haya una Web sesión.
function webAuth(req, res, next) {
    console.log(req.session)
    console.log(req.session.nombre)
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

//Función para autenticar que hay un usuario logueado.
function usersAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ Error: 'Usuario no autorizado!' })
    }
}

module.exports = { webAuth, usersAuth }