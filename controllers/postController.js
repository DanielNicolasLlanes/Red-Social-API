
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

//funcion para modificar un post de un usuario autenticado:
const updatePost = async (req, res) => {
    try {
        //extrae el id del usuario autenticado desde el middleware
        const userId = req.user.id;

        //guarda el titulo y contenido desde el cuerpo de la solicitud
        const {titulo, contenido} =  req.body;

        //busca el post por el id
        const post = await Post.findByPk(req.params.id);
        if (!post){//si no encuentra el post por id lanza error 404 Not Found
            res.status(404).send({message: "Post no encontrado"})
        }
        //validamos que el post encontrado sea el del usuario autenticado
        if (post.id_usuario !== userId){
            return res.status(403).send({ message: "No autorizado para modificar esta publicación" });
        }

        //actualiza los campos:
        post.titulo = titulo || post.titulo;
        post.contenido = contenido || post.contenido;

        //guarda los cambios en la base de datos
        await post.save();

        //devolvemos un mensaje y la publicación modificada
        res.status(200).send({message:"modificación exitosa", post})

    } catch (error) {
        res.status(500).send({message: "Error interno del servidor"})
    }
}
//funcion para eliminar una publicación de un usuario autenticado
const deletePost = async (req, res) => {
    try {
        //extrae el ID del usuario autenticado
        const userId = req.user.id;
        const postId = req.params.id;
        //busca en la base de datos el post por su id
        const post = await Post.findByPk(postId);
        if (!post) {//valida si la busqueda fue exitosa, de lo contrario devuelve error 404 Not Found
            res.status(404).send({message: "Post no encontrado"});
        }
        //verifica que el post a eliminar sea del usuario autenticado
        if (post.id_usuario !== userId) {
            res.status(403).send({message: "No autorizado para eliminar este post"});
        }
        const postDestroy = await Post.destroy({
            where: {id: postId}
        });
        if (postDestroy) {
            res.status(200).send({ message: "Post eliminado exitosamente" });  
    }else{
        res.status(404).send({message: "Post no encontrado"});
    }
    } catch (error) {
        res.status(500).send({message: "error interno del servidor"});
    }}



module.exports = {
    home,
    createPost,
    getUserPosts,
    updatePost,
    deletePost
}