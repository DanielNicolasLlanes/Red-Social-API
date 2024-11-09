const express = require("express");// importamos el paquete de express
const router = express.Router(); //importamos la utilidad de express que nos permite definir las rutas
//importamos el controlador que indicará las instrucciones que debe cumplir una ruta
const usuarioController = require("../controllers/usuarioController")


//se crean los endpoints, con el metodo http correspondiente, el nombre de la ruta y el controlador asociado a cada una
router.get("/", usuarioController.home);
router.get("/list", usuarioController.list);
router.post("/register", usuarioController.register);
router.get("/info/:id", usuarioController.findById); //Se le pasa por parametro el id del usuario a buscar

module.exports = router; //indicamos que el recurso router este disponible desde fuera del archivos

