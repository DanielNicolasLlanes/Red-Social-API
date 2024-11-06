const db = require("../models"); //importamos los archivos del modelo
const Usuario = db.usuario // se crea el objeto usuario para tener acceso al modelo del ORM para interactuar con la base de datos

//define el controlador de la ruta principal
const home = (req, res) =>{
    res.status(200).send("ruta principal de usuario");
};



const list = async (req, res) => {  //async indica que la función devuelve una promesa, ya que requiere de una interacción con la base de datos
    try {
        const listaUsuarios = await Usuario.findAll(); //selecciona todos los usuarios de la db y los coloca en la constante
        res.status(200).send(listaUsuarios); //devuelve la lista como respuesta
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//exportamos las funciones del controlador, para poder crear los endpoints en las rutas:
module.exports = {
    home,
    list
}