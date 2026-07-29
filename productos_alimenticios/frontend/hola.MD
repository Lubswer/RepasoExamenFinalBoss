# 🚀 Guía de Desarrollo MERN Stack desde Cero

Documento de referencia práctica y comandos clave para la construcción de proyectos backend y frontend.

---

## 1. ⚙️ Inicialización del Backend

### Paso 1.1: Inicializar el proyecto Node.js

```bash
npm init -y
```

### Paso 1.2: Configurar `package.json` para ES Modules y Scripts

Editar el archivo `package.json` generado:

```json
{
  "name": "nombre_proyecto",
  "version": "1.0.0",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "start": "node src/index.js"
  }
}
```

> **Notas de Scripts:**
>
> - `npm run dev`: Ejecuta el servidor en modo desarrollo con reinicio automático (`--watch`).
> - `npm start`: Ejecuta el servidor en modo producción sin observador (comando reservado nativo).

### ⚡ Comando para crear la estructura en PowerShell:

```powershell
mkdir src/config, src/controllers, src/helpers, src/middleware, src/models, src/routes
```

---

## 2. 📦 Instalación de Dependencias Backend

### Dependencias de Producción:

```bash
npm install express dotenv mongoose cors bcryptjs jsonwebtoken
```

- **`express`**: Framework web para manejo de rutas y servidor HTTP.
- **`dotenv`**: Carga de variables de entorno desde archivo `.env`.
- **`mongoose`**: ODM para modelado y conexión con MongoDB Atlas.
- **`cors`**: Permitir solicitudes HTTP entre frontend y backend de distintos orígenes.
- **`bcryptjs`**: Encriptación de contraseñas de usuarios.
- **`jsonwebtoken`**: Generación y verificación de tokens de autenticación (JWT).

### Dependencias opcionales de desarrollo (si no usas `node --watch`):

```bash
npm install -D nodemon
```

---

## 3. 📄 Variables de Entorno Iniciales (`.env`)

Crear el archivo `.env` en la raíz del backend:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<nombre_db>
JWT_SECRET=tu_clave_secreta_super_segura
```

---

## 4. 📁 Estructura de Carpetas Estándar del Backend (Patrón MVC para API REST)

```
backend/
 ├── .env                 # Variables de entorno secretas
 ├── .gitignore           # Archivos omitidos en Git (node_modules, .env)
 ├── package.json         # Configuración del proyecto y dependencias
 └── src/
      ├── config/         # Configuraciones de servicios de terceros (Cloudinary, Nodemailer, etc.)
      ├── controllers/    # (C de MVC) Lógica de negocio (funciones que procesan req y res)
      ├── database.js     # Conexión a la base de datos MongoDB con Mongoose
      ├── helpers/        # Funciones auxiliares reutilizables (envío de mails, generador de tokens)
      ├── middleware/     # Interceptores de peticiones (autenticación JWT, roles, validaciones)
      ├── models/         # (M de MVC) Esquemas y modelos de datos de Mongoose
      ├── routes/         # Definición de endpoints HTTP (GET, POST, PUT, DELETE)
      ├── server.js       # Instancia y middlewares globales de la app Express
      └── index.js        # Punto de entrada principal que levanta el puerto y conecta la BD
```

### 🧠 Roles de cada módulo:

- **`models/`**: Define la estructura de las colecciones en MongoDB (Campos, tipos, validaciones).
- **`controllers/`**: Recibe la petición del usuario (`req`), interactúa con el `model`, procesa la lógica y responde (`res.status().json()`).
- **`routes/`**: Vincula las URLs (`/api/productos`) con los métodos HTTP y sus respectivos controladores.
- **`middleware/`**: Valida si el usuario tiene permiso (Token JWT) ANTES de dejarlo llegar al controlador.

---

## 5. 🙈 Archivo `.gitignore`

Sirve para excluir archivos sensibles (claves) y pesados (dependencias) del repositorio de Git.

### `.gitignore` típico para Backend Node.js:

```gitignore
# Ignorar carpeta completa (lleva / al final)
node_modules/
dist/
uploads/

# Ignorar archivos específicos de credenciales
.env
.env.local

# Ignorar archivo dentro de una ruta específica
src/index.js

# Ignorar archivos por extensión (comodín *)
*.log
```

### Reglas rápidas de sintaxis:
* **`carpeta/`**: Ignora la carpeta completa y todo su contenido.
* **`.env`**: Ignora ese archivo individual en la raíz.
* **`src/archivo.js`**: Ignora un archivo específico dentro de una subcarpeta.
* **`*.log`**: Ignora todos los archivos con esa extensión.

---

## 6. ⚙️ Servidor Base (`src/server.js`) y Objeto `app`

El objeto `app` entregado por Express es un objeto principal que contiene la configuración y reglas de la aplicación.

### Métodos del Objeto `app`:
* **`app.use()`**: Engancha middlewares globales (CORS, parseador JSON) o conjuntos de rutas por las que pasa toda petición HTTP.
* **`app.set()`**: Almacena variables de configuración interna del servidor (ej. guardar la variable del puerto).
* **`app.get()` / `app.post()` / `app.put()` / `app.delete()`**: Escuchan y responden a verbos HTTP específicos en rutas determinadas.

---

## 7. 🚀 Punto de Entrada (`src/index.js`) y Arranque

Es el ejecutor principal que enciende la aplicación y coordina los servicios.

### Responsabilidades clave:
* Importar la configuración del servidor Express (`server.js`).
* Ejecutar la función de conexión a la base de datos (`database.js`).
* Arrancar la escucha de peticiones HTTP en el puerto asignado (`app.listen()`).

---

## 8. 🗄️ Conexión a Base de Datos (`src/database.js`)

Establece la comunicación asíncrona entre Node.js y la base de datos MongoDB usando Mongoose.

### Conceptos clave:
* **`strictQuery: true`**: Filtra búsquedas para que solo acepten campos definidos en el esquema.
* **`mongoose.connect()`**: Conecta a la base de datos usando la URI del archivo `.env`.
* **`async / await`**: Garantiza que el servidor espere a la base de datos antes de continuar.
* **`try / catch`**: Atrapa errores de credenciales o red sin tumbar el servidor.

---

## 9. 📦 Modelos y Esquemas Mongoose (`src/models/`)

Define la estructura de los documentos en la base de datos y sus reglas de validación.

### Componentes principales:
* **Schema**: Molde o plano que define tipos de datos (`String`, `Number`, `Boolean`), validaciones (`required`, `unique`, `trim`) y valores por defecto (`default`).
* **Timestamps (`{ timestamps: true }`)**: Opción del esquema que genera automáticamente los campos de fecha `createdAt` y `updatedAt`.
* **Métodos Personalizados (`methods`)**: Funciones asociadas al esquema para lógica propia de la entidad (encriptar clave con `bcrypt`, verificar contraseña, generar tokens).
  * **Regla importante**: Deben declararse con funciones tradicionales `function()` (no funciones flecha) para preservar el contexto de `this`.
* **Model**: Compila el esquema para interactuar con la colección en MongoDB Atlas.

---

## 10. 🕹️ Controladores y Lógica de Negocio (`src/controllers/`)

Gestión de peticiones entrantes (`req`), procesamiento de datos y respuesta al cliente (`res`).

### Puntos clave:
* **Entradas de datos (`req`)**:
  * `req.body`: Datos del cuerpo de la petición (formularios o JSON).
  * `req.params`: Parámetros dinámicos en la URL (`:id`, `:token`).
  * `req.query`: Parámetros de consulta en URL (`?categoria=lacteos`).
  * `req.headers`: Cabeceras de la petición (tokens de autorización).
* **Desestructuración**: Extracción limpia de propiedades en variables.
* **Corte de ejecución (`return`)**: Indispensable ante cualquier error para evitar enviar múltiples respuestas (`ERR_HTTP_HEADERS_SENT`).
* **Operaciones asíncronas**: Uso obligatorio de `await` en llamadas a base de datos (`.findOne()`, `.save()`, `.findById()`).

---

## 11. 🛡️ Validaciones, Expresiones Regulares y Errores HTTP

### Estrategias de Validación:
* **Campos requeridos**: Comprobación con `Object.values(req.body).includes("")` o evaluadores de existencia (`!campo`).
* **Formatos de texto (RegEx)**: Uso de patrones como `/^\d{4}-\d{2}-\d{2}$/` para fechas (`YYYY-MM-DD`) o validación de email con `@`.
* **Identificadores válidos**: Verificación previa de IDs de MongoDB con `mongoose.Types.ObjectId.isValid(id)` para evitar errores de casteo (24 caracteres).

### Códigos de Estatus HTTP Frecuentes:
* **`200 OK`**: Petición procesada con éxito.
* **`201 Created`**: Recurso creado correctamente en base de datos.
* **`400 Bad Request`**: Datos de entrada inválidos o campos incompletos por parte del cliente.
* **`401 Unauthorized`**: Token ausente, inválido o credenciales incorrectas.
* **`403 Forbidden`**: Petición rechazada por falta de permisos o rol.
* **`404 Not Found`**: Recurso o ruta no encontrada.
* **`500 Internal Server Error`**: Fallo inesperado en el servidor o caída de base de datos.

---

## 12. 🔗 Relaciones y Referencias entre Modelos

Vinculación entre colecciones de MongoDB mediante identificadores.

### Conceptos clave:
* **`Schema.Types.ObjectId`**: Tipo de campo destinado a almacenar un identificador de MongoDB de 24 caracteres.
* **`ref`**: Propiedad que indica a Mongoose con qué modelo destino se conecta dicho identificador.
* **Relaciones 1:1 o 1:N**: Referencia directa como objeto plano o array de IDs `[{ type: ObjectId, ref: 'Modelo' }]`.
* **`.populate()`**: Método de consulta que reemplaza automáticamente el ID almacenado por el objeto de datos completo del modelo referenciado.

---

## 13. 🛡️ Middlewares de Intercepción (`src/middleware/`) y Flujo `next()`

Funciones guardianas que se ejecutan entre la llegada de la petición y el controlador final.

### Conceptos clave:
* **Parámetros obligatorios (`req`, `res`, `next`)**: A diferencia de un controlador común, requiere la función `next()` como tercer argumento.
* **Función `next()`**: Autoriza el paso de la petición hacia el siguiente middleware o al controlador final.
* **Corte de seguridad**: Si la validación falla (token ausente o inválido), responde de inmediato y evita ejecutar `next()`.
* **Centralización**: Evita repetir lógica de autenticación o validación de tokens en cada controlador individual (Principio DRY).

---

## 14. 💡 Consideraciones de Respuestas HTTP y Actualización Mongoose

### Comportamiento del Código `204 No Content`:
* **Regla del protocolo HTTP**: El estatus `204` indica éxito pero **omite automáticamente cualquier cuerpo de respuesta o JSON** enviado al cliente.
* **Uso recomendado**: Si se desea devolver un objeto JSON con un mensaje explícito de confirmación (ej. `"Cliente eliminado"`), se debe usar `200 OK`.

### Operaciones de Actualización (`findByIdAndUpdate`):
* **Búsqueda por ID**: `.findById()` devuelve un objeto individual o `null`; `.find()` devuelve un array `[]`.
* **Parámetro `{ new: true }`**: Obliga a Mongoose a retornar el documento ya modificado tras la actualización en lugar del estado previo.

---

*Estado actual: Guía completa de arquitectura backend MERN terminada y documentada.* 📌
