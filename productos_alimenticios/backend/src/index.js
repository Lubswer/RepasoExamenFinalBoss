import app from "./server.js"
import connection from "./database.js"

connection()

app.listen(app.get("port"), () => (
    console.log(`App corriendo correctamente en http://localhost:${app.get("port")} !!`)
))