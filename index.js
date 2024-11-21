const express = require("express"); //se importa el paquete de express
const bodyParser = require("body-parser"); //se importa el paquete de body parser
const app = express() //se crea la aplicación de express
const PORT = 3000;

const usuarioRouter = require("./routes/usuarioRoutes");//importamos las rutas de usuario en el index
const authRouter = require("./routes/authRoutes");//importamos las rutas de auth

app.use(bodyParser.json());//se configura para que todas las respuestas sean dadas en formato json
app.use(express.urlencoded({ extended: true }));//se configura para parsear los datos de formulario desde postman

app.use("/api/usuarios", usuarioRouter);//configura la ruta principal y usa las rutas de usuario
app.use("/api/auth", authRouter);//configura la ruta principal para el login

app.listen(PORT, () => {
    console.log("aplicacion corriendo")
})