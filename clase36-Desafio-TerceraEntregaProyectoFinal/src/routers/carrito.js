const express = require("express")
const router = express.Router()
const apiCarritos = require('../api/apiCarritos')

/* GET: '/' - Lista todos los carritos. */
router.get("/", apiCarritos.getCarritos)

/* POST: '/' - Crea un carrito vacío  */
router.post("/:id", apiCarritos.saveNewCarrito)

/* DELETE: '/:id' - Vacía un carrito y lo elimina */
router.delete("/:id", apiCarritos.deleteCarrito)

/* GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito */
router.get("/:id/productos", apiCarritos.getCarrito)

/* POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto */
router.post("/:id/productos", apiCarritos.addProdCarrito)

/* DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto */
router.delete("/:id/productos/:id_prod", apiCarritos.deleteProdCarrito)

/* POST: '/:id/compra' - Para finalizar compra de productos del carrito */
router.post("/:id/compra", apiCarritos.compraProductos)

module.exports = router;