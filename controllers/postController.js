
const db = require("../models"); //importamos los archivos del modelo
const Post = db.Post // se crea el objeto Post para tener acceso al modelo del ORM para interactuar con la base de datos

//funcion para la ruta principal de post
const home = (req, res) =>{
    res.status(200).send("ruta principal de posts");
};

const createPost = async (req, res) => {
    const {titulo, contenido} = req.body;
    
    try {
        //valida que el usuario esté autenticado (req.user viene del middleware)
        if (!req.user){
            return res.status(401).send({ message: "No autorizado" });
        }
        //crea el post con el usuario autenticado
        const post = await Post.create({
            id_usuario: req.user.id, //asocia el post al usuario autenticado
            titulo,
            contenido,
        })
        res.status(201).send(post); //devuelve el post creado
    } catch (error) {
       res.status(500).send({message: "Error del interno servidor"}) 
    }
}


module.exports = {
    home,
    createPost
}