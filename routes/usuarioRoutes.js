const express = require("express");// importamos el paquete de express
const router = express.Router(); //importamos la utilidad de express que nos permite definir las rutas
//importamos el controlador que indicará las instrucciones que debe cumplir una ruta
const usuarioController = require("../controllers/usuarioController")


//se crea la ruta principal de usuario, llama a home que indica que función del controlador será utilizada:
router.get("/", usuarioController.home);
router.get("/list", usuarioController.list);

module.exports = router; //indicamos que el recurso router este disponible desde fuera del archivos

