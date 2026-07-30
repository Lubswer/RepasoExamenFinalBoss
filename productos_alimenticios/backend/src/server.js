import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/usuario_routes.js"
import clienteRoutes from "./routes/cliente_routes.js"
import productoRoutes from "./routes/producto_routes.js"
import pedidoRoutes from "./routes/pedidos_routes.js"

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.set("port", process.env.PORT || 3000)

app.get("/", (req,res) => res.send("server online"))

app.use("/api", userRoutes)
app.use("/api", clienteRoutes)
app.use("/api", productoRoutes)
app.use("/api", pedidoRoutes)

export default app
