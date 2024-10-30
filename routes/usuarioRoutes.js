const express = require("express");// importamos el paquete de express
const router = express.Router(); //importamos la utilidad de express que nos permite definir las rutas

//se crea la ruta principal de usuario:
router.get("/", (req, res) =>{
    res.status(200).send("ruta principal de usuario");
});

module.exports = router; //indicamos que el recurso router este disponible desde fuera del archivos

