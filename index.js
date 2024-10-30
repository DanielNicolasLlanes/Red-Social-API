const express = require("express"); //se importa el paquete de express
const bodyParser = require("body-parser"); //se importa el paquete de body parser
const app = express() //se crea la aplicación de express
const PORT = 3000;
const usuarioRouter = require("./routes/usuarioRoutes");//importamos las rutas de usuario en el index


app.use(bodyParser.json());//se configura para que todas las respuestas sean dadas en formato json
app.use("/api/usuarios", usuarioRouter);//configura la ruta principal y usa las rutas de usuario

app.listen(PORT, () => {
    console.log("aplicacion corriendo")
})