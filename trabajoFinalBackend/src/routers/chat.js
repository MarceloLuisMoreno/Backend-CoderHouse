const express = require("express")
const router = express.Router()
const chats = require('../controllers/Mensaje.controller')
const middlewares = require('../middlewares/middlewares')
const validations = require('../middlewares/validations')


/* GET: '/' - Lista todos los chats. */
router.get("/:email", middlewares.usersAuth, chats.listar)

/* GET: '/' - Lista todos los chats. */
router.post("/", middlewares.usersAuth, validations.validate(validations.validationMessage), chats.guardar)

module.exports = router;