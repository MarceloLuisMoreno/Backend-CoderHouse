const express = require("express")
const router = express.Router()
const usuarios = require('../controllers/Usuario.controller')
const middlewares = require('../middlewares/middlewares')
const validations = require('../middlewares/validations')


/* GET: '/' - Lista un Usuario. */
router.get("/:id", middlewares.usersAuth, usuarios.listar)

/* POST: '/:id' - Para incorporar usuario al archivo */
router.post("/", middlewares.usersAuth, validations.validate(validations.validationUsuario), usuarios.guardar)


module.exports = router;