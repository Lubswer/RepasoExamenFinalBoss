import {registro, login} from "../controllers/usuario_controller.js"
import { Router } from "express"

const userRoutes = Router()

userRoutes.post("/usuario/registro", registro)
userRoutes.post("/usuario/login", login)

export default userRoutes;
