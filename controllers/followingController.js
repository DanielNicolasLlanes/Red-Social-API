const db = require("../models"); //importamos los archivos del modelo
const Following = db.Following//se crea el objeto following para tener acceso al modelo del ORM para interactuar con la base de datos
const Usuario = db.usuario//se crea el objeto usuario par tener acceso en la base de datos 

//funcion para crear una nueva relación de seguimiento
const createFollow = async (req, res) => {
    const userId = req.user.id; //toma el id del usuario autenticado del middleware 
    const  {id_usuario_seguido}  = req.body;//extrae el id del cuerpo de la solicitud

    if (userId == id_usuario_seguido) {//pregunta si el usuario a intentar seguir es el mismo que él:
        return res.status(400).send({ message: "No puedes seguirte a ti mismo" });
    }

    try {
        await Following.create({ id_usuario: userId, id_usuario_seguido }); //crea un nuevo registro de seguimiento
        
        const usuario = await Usuario.findByPk(id_usuario_seguido,
        {attributes: ["id", "nombre", "nickname"]}); //guarga el usuario seguido

        if (!usuario) {
            return res.status(404).send({ message: "El usuario no existe" });
        }

        res.status(201).send({ message: "Has comenzado a seguir al usuario", usuario: usuario, });//devuelve un mensaje con el usuario seguido

    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(401).send({message: "Ya sigues a este usuario"});
        }
        else{
            res.status(500).send({ 
                error: error.message,
                tipo: error.name 
            });
        }
    }
};

//funcion para eliminar una relación de seguimiento
const unfollow = async (req, res) => {
    try {
        const userId = req.user.id //toma el id del usuario autenticado del middleware
        const  {id_usuario_seguido}  = req.body;//extrae el id del cuerpo de la solicitud
        
        //verifica que el usuario que va dejar de seguir no sea a si mismo
        if (userId === id_usuario_seguido) {
            return res.status(400).send({ message: "No puedes dejar de seguirte a ti mismo" });
        }
        //verifica que el usuario exista, y se guarda para mostrarlo en la respuesta
        const usuario = await Usuario.findByPk(id_usuario_seguido, 
        {attributes: ["id","nombre", "nickname"]}); //incluimos solo datos necesarios para mostrar en la respuesta

        if (!usuario){
            res.status(404).send({message: "Usuario no encontrado"})
        }
        //verifica que la relación de seguimiento exista buscandola en la base de datos
        const follow = await Following.findOne({//selecciona un registro en la tabla following, donde:
            where: {
                id_usuario: userId, //usuario autenticado
                id_usuario_seguido, //usuario seguido
            },
        });
        if (!follow) {//en caso de que no exista respondemos con un error 404 Not Found
            return res.status(404).send({ message: "No sigues a este usuario" });
        }
        //elimina la relación de seguimiento
        await Following.destroy({
            where: {
                id_usuario: userId,//selecciona los campos especificos, el ID del usuario autenticado
                id_usuario_seguido,//el ID del usuario a ser eliminado
            },
        });
        res.status(200).send({ message: "Has dejado de seguir al usuario", usuario:usuario });
        
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor"});
    }
}

module.exports = {
    createFollow,
    unfollow,
}
