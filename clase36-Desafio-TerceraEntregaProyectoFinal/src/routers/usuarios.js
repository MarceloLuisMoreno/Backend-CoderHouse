const express = require("express")
const router = express.Router()
const apiUsuarios = require('../api/apiUsuarios')
const validations = require('../utils/validations')

/* GET: '/' - Lista un Usuario. */
router.get("/:id", apiUsuarios.getUsuario)

/* POST: '/:id' - Para incorporar usuario al archivo */
router.post("/:id", validations.validate(validations.validationUsuario),apiUsuarios.saveUsuario)


module.exports = router;