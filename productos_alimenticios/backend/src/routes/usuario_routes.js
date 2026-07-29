import {registro, login} from "../controllers/usuario_controller.js"
import { Router } from "express"

const userRoutes = Router()

userRoutes.post("/usuario/registro", registro)
userRoutes.get("/usuario/login", login)

export default userRoutes;
