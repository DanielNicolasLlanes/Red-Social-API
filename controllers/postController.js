
const db = require("../models"); //importamos los archivos del modelo
const Post = db.Post // se crea el objeto Post para tener acceso al modelo del ORM para interactuar con la base de datos

//funcion para la ruta principal de post
const home = (req, res) =>{
    res.status(200).send("ruta principal de posts");
};


module.exports = {
    home
}