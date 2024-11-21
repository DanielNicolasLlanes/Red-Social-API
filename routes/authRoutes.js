const express = require("express");// importamos el paquete de express
const router = express.Router(); //importamos la utilidad de express que nos permite definir las rutas
//importamos el controlador que indicará las instrucciones que debe cumplir una ruta
const authController = require("../controllers/authController");

router.post("/login", authController.login);//autentica a un usuario mediante mail y password

module.exports = router; //indicamos que el recurso router este disponible desde fuera del archivos
