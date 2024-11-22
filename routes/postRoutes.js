const express = require("express");//importamos el paquete express
const router = express.Router();//importamos la utilidad de express que nos permite definir las rutas
//importamos el controlador que indicará las instrucciones que debe cumplir una ruta
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware"); //middleware de autenticación

//se crean los endpoints, con el metodo http correspondiente, el nombre de la ruta y el controlador asociado a cada una
router.post("/create", auth, postController.createPost);//crea un nuevo post con usuario autenticado
router.get("/get", auth, postController.getPosts);//obtiene los posts de un usuario autenticado
router.put("/update/:id", auth, postController.updatePost);//modifica un post de un usuario autenticado
router.delete("/delete/:id", auth, postController.deletePost);//elimina un post de un usuario autenticado
router.get("/getpost/:id", auth, postController.getUserPost);//obtiene un post por id, del usuario autenticado o de un usuario seguido
router.get("/user-posts/:id", auth, postController.getPostFrom);//obtiene los posts de un usuario seguido

//adicionales
router.get("/", postController.home);

module.exports = router;