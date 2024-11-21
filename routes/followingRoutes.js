const express = require("express");//importamos el paquete express
const router = express.Router();//importamos la utilidad de express que nos permite definir las rutas
const followingController = require("../controllers/followingController");//importamos el controlador de los seguimientos
const auth = require("../middlewares/authmiddleware"); //middleware de autenticación

//se crean los endpoints, con el metodo http correspondiente, el nombre de la ruta y el controlador asociado a cada una
router.post("/follow", auth, followingController.createFollow);//seguir a un nuevo usuario
router.delete("/unfollow", auth, followingController.unfollow);//eliminar una relación de seguimiento

module.exports = router;