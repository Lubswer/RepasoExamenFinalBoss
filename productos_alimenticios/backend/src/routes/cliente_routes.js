import {Router} from "express"
import {registro, listar, eliminar, actualizar} from "../controllers/cliente_controller.js"
import verificarToken from "../middleware/verificarToken.js"

const clienteRoutes = Router()

clienteRoutes.post("/clientes/registro", verificarToken,registro)
clienteRoutes.get("/clientes/listar",verificarToken,listar)
clienteRoutes.delete("/clientes/eliminar", verificarToken,eliminar)
clienteRoutes.patch("/clientes/actualizar", verificarToken, actualizar)

export default clienteRoutes