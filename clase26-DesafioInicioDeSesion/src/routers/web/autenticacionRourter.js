const express = require("express")
const router = express.Router()
const passport = require("passport")
const { Strategy: LocalStrategy } = require("passport-local")
const app = express()

/*============================[Base de Datos]============================*/
const usuariosDB = [];



/*----------- Passport -----------*/
passport.use(new LocalStrategy(
    (username, password, done) => {
        //Logica para validar si un usuario existe
        const existeUsuario = usuariosDB.find(usuario => {
            return usuario.nombre == username;
        });

        if (!existeUsuario) {
            console.log('Usuario no encontrado')
            return done(null, false);
        }

        if (!(existeUsuario.password == password)) {
            console.log('Contraseña invalida')
            return done(null, false);
        }

        return done(null, existeUsuario);
    }
))

passport.serializeUser((usuario, done) => {
    done(null, usuario.nombre);
})

passport.deserializeUser((nombre, done) => {
    const usuario = usuariosDB.find(usuario => usuario.nombre == nombre);
    done(null, usuario);
});

app.use(passport.initialize());
app.use(passport.session());

/* functions */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}




//Router de autenticación de sesión
router.get('/', (req, res)=>{
    if (req.session.nombre) {
        res.redirect('/home')
    } else {
        res.redirect('/login')
    }
})

router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/home',
        failureRedirect: '/login-error'
    }
))

router.get('/login-error', (req, res)=>{
    res.render('login-error');
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.post('/register', (req, res)=>{
    const {nombre, password } = req.body;
    
    const newUsuario = usuariosDB.find(usuario => usuario.nombre == nombre);
    if (newUsuario) {
        res.render('register-error')
    } else {
        console.log(nombre, password)
        usuariosDB.push({nombre, password});
        res.redirect('/login')
    }
});

router.get('/home', isAuth, (req, res)=>{
    console.log(req.user)
    res.render('home', { nombre: req.user.nombre });
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;