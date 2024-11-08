const db = require("../models"); //importamos los archivos del modelo
const Usuario = db.usuario // se crea el objeto usuario para tener acceso al modelo del ORM para interactuar con la base de datos

//define el controlador de la ruta principal
const home = (req, res) =>{
    res.status(200).send("ruta principal de usuario");
};


//funcion para listar todos los usuarios en la base de datos
const list = async (req, res) => {  //async indica que la función devuelve una promesa, ya que requiere de una interacción con la base de datos
    try {
        const listaUsuarios = await Usuario.findAll(); //selecciona todos los usuarios de la db y los coloca en la constante
        if (listaUsuarios > 0){
            res.status(200).send(listaUsuarios); //devuelve la lista como respuesta
        }else{
            res.status(404).send({ message: "Aún no hay registros" })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
//funcion para crear un usuario
const create = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//exportamos las funciones del controlador, para poder crear los endpoints en las rutas:
module.exports = {
    home,
    list,
    create
}