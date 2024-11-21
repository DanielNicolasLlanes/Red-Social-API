
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

//función para listar los posts de un usuario autenticado
const getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id; //obtiene el ID del usuario autenticado desde el middleware

        //busca los posts del usuario autenticado
        const posts = await Post.findAll({
            where: { id_usuario: userId }, //filtra por el ID del usuario autenticado
            include: {
                model: db.usuario,
                attributes: ["id", "nombre", "mail"], //incluye los datos básicos del usuario
            },
        });

        //valida si el usuario no tiene posts
        if (posts.length === 0) {//devolvemos error 404 Not Found
            return res.status(404).send({ message: "No tienes posts creados" });
        }

        res.status(200).send(posts);
    } catch (error) {
        console.error("Error al obtener los posts del usuario autenticado:", error);
        res.status(500).send({message: "Error interno del servidor",});
    }
};

/*funcion para modificar un post de un usuario autenticado:
const updatePost = async (req, res) = > {
}
*/



module.exports = {
    home,
    createPost,
    getUserPosts
}