const express = require("express"); //se importa el paquete de express
const bodyParser = require("body-parser"); //se importa el paquete de body parser
const app = express() //se crea la aplicación de express

app.use(bodyParser.json());//se configura para que todas las respuestas sean dadas en formato json

app.listen(3000, () => {
    console.log("aplicacion corriendo")
})