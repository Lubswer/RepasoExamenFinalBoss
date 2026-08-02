import Route from "express"
import { registrar,listar, actualizar, eliminar } from "../controllers/pedido_controller.js"
import verificarToken from "../middleware/verificarToken.js"

const pedidoRoutes = Route()

pedidoRoutes.post("/pedido/registro", verificarToken, registrar)
pedidoRoutes.get("/pedido/listar", verificarToken, listar)
pedidoRoutes.patch("/pedido/actualizar", verificarToken, actualizar)
pedidoRoutes.delete("/pedido/eliminar", verificarToken, eliminar)

export default pedidoRoutes