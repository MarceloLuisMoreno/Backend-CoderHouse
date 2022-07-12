const config = require('../../config/config')
const JWT_PRIVATE_KEY = config.jwt_privateKey;

const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt')

//============================[Base de Datos Usuarios]============================
const UsuariosDAOFactory = require("../../persistencia/DAOs/UsuarioDAOFactory.class")
const DAOusr = UsuariosDAOFactory.get()

const logger = require('../../loggers/logger')


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
passport.use(new LocalStrategy({
    session: false
}, async function (email, password, done) {
    let existeUsuario
    try {
        existeUsuario = await DAOusr.listar(email)
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


passport.use(new JWTstrategy({
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
        secretOrKey: JWT_PRIVATE_KEY
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }))


passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
})

passport.deserializeUser(async (email, done) => {
    let usuario
    try {
        usuario = await DAOusr.listar(email)
    } catch (err) {
        throw done(err)
    }
    done(null, usuario);
});

module.exports = {
    passport,
    hashPassword
};