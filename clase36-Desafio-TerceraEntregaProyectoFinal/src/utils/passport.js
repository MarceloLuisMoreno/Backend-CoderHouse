const passport = require("passport")

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const logger = require('../loggers/logger')
/*============================[Base de Datos]============================*/
const userDAO = require('../daos/RegisterUserDaoMongoDB')



/* ========= Configuracion bcrypt =================== */
const rounds = 12
const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, rounds, (err, hash) => {
        if (err) {
            logger.error(err)
            return err
        }
        return hash
    })
    return hash
}

const comparePassword = (password, hash) => {
    const bool = bcrypt.compareSync(password, hash, (err, res) => {
        if (err) {
            logger.error(err)
            return false
        }
        return res
    })
    return bool
}

/*----------- Passport -----------*/
passport.use(new LocalStrategy(async function (email, password, done) {
    let existeUsuario
    try {
        existeUsuario = await userDAO.getById(email)
    } catch (err) {
        throw done(err)
    }
    if (!existeUsuario) {
        logger.info('Usuario no encontrado')
        return done(null, false);
    }
    const bool = await comparePassword(password, existeUsuario.password)
    if (bool == false) {
        logger.info('Contraseña invalida')
        return done(null, false);
    }

    return done(null, existeUsuario);
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
})

passport.deserializeUser(async (email, done) => {
    let usuario
    try {
        usuario = await userDAO.getById(email)
    } catch (err) {
        throw done(err)
    }
    done(null, usuario);
});

module.exports = {
    passport,
    hashPassword
};