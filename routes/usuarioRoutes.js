const express = require("express");// importamos el paquete de express
const router = express.Router(); //importamos la utilidad de express que nos permite definir las rutas
const auth = require("../middlewares/authmiddleware");
//importamos el controlador que indicará las instrucciones que debe cumplir una ruta
const usuarioController = require("../controllers/usuarioController");


//se crean los endpoints, con el metodo http correspondiente, el nombre de la ruta y el controlador asociado a cada una
router.post("/register", usuarioController.register);//registra a un nuevo usuario
router.get("/list", usuarioController.list);//lista a todos los usuarios registrados
router.put("/me", auth, usuarioController.update);//permite al usuario editar su perfil (requiere autenticación)
//router.post("/login", usuarioController.login);//autentica a un usuario mediante mail y password

//adiciones:
router.get("/", usuarioController.home);//ruta principal de usuario
router.get("/info/:id", usuarioController.findById); //Se le pasa por parametro el id del usuario a buscar

module.exports = router; //indicamos que el recurso router este disponible desde fuera del archivos

