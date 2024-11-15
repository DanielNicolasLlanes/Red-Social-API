//const { password } = require("../config/config");

const db = require("../models"); //importamos los archivos del modelo
const Usuario = db.usuario // se crea el objeto usuario para tener acceso al modelo del ORM para interactuar con la base de datos

//funcion para la ruta principal de usuario
const home = (req, res) =>{
    res.status(200).send("ruta principal de usuario");
};


//funcion para listar todos los usuarios en la base de datos
const list = async (req, res) => {  //async indica que la función devuelve una promesa, ya que requiere de una interacción con la base de datos
    try {
        const listaUsuarios = await Usuario.findAll({
            attributes: {exclude: ['password']} //excluimos la contraseña en la lista que guarda los usuarios
        }); 
        if (listaUsuarios.length > 0){
            res.status(200).send(listaUsuarios); //devuelve la lista como respuesta
        }else{
            res.status(404).send({ message: "Aún no hay registros" })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
//funcion para crear un usuario
const register = async (req, res) => {
    try {
        const {nombre, nickname, mail, password} = req.body; //extrae y guarda los datos del body
    
        if (!nombre || !nickname || !mail || !password) {    //se validan los datos ingresados:
            return res.status(400).send({ message: "Todos los campos son obligatorios" });
        }
        //se crea el usuario
        const usuario = await Usuario.create({nombre, nickname, mail, password});
        res.status(201).send(usuario); //devuelve el usuario como respuesta exitosa
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError"){
            res.status(400).send({message: "Mail o nickname ya existente"});
        }else{
        res.status(500).send( {message: error.message, nombre: error.name});
        }
    }
}
//funcion para encontrar un usuario por id
const findById = async(req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id); //se pasa a la funcion del ORM el id en los parametros del req
        if (usuario){
            res.status(200).send(usuario); //si el usuario fue encontrado, respuesta 200 OK
        }else{
            res.status(404).send({message: "Not found"}); //de no existir usuario con ese id, respuesta 404 Not Found
        }
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor"});//si el try falla, error del servidor
    }
}

//funcion para autenticar a un usuario mediante mail y password:
const login = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//funcion para editar un usuario (requiere autenticación)
const update = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//exportamos las funciones del controlador, para poder crear los endpoints en las rutas:
module.exports = {
    home,
    list,
    register,
    findById,
    login,
    update
}