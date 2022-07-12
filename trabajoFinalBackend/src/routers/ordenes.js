const express = require("express")
const router = express.Router()
const ordenes = require('../controllers/OrdenCompra.controller')
const middlewares = require('../middlewares/middlewares')


/* GET: '/' - Lista todos los ordenes. */
router.get("/:email", middlewares.usersAuth, ordenes.listar)

/* POST: '/' - Guardar orden  */
router.post("/", middlewares.usersAuth, ordenes.guardar)


module.exports = router;