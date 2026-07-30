import Route from "express"
import {registro, listar, eliminar, actualizar} from "../controllers/producto_controller.js"
import verificarToken from "../middleware/verificarToken.js"

const productoRoutes = Route()

productoRoutes.post("/producto/registro", verificarToken, registro)
productoRoutes.get("/producto/listar", verificarToken, listar)
productoRoutes.delete("/producto/eliminar", verificarToken, eliminar)
productoRoutes.patch("/producto/actualizar", verificarToken, actualizar)


export default productoRoutes