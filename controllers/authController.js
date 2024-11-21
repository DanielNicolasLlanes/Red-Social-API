const bcrypt = require("bcryptjs"); //importa el bcrypt para encriptar 
const jwt = require("jsonwebtoken");//
const db = require('../models'); // Importar los modelos
const Usuario = db.usuario; // Acceder al modelo Usuario

const login = async (req, res) => {
    const { mail, password } = req.body; //almacena el mail y la contraseña del body    

    try {
        //verifica si existe un usuario con ese mail
        const usuario = await Usuario.findOne({ where: { mail } });//intenta buscar el usuario con el mismo mail en la base de datos
        if (!usuario) { //si el usuario no fue encontrado devuelve error 404:
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        //compara la contraseña pasada en el body y la del usuario en la bd con bcrypt
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) { //si no coincide responde con error de solicitud 400
            return res.status(400).send({ message: "Contraseña incorrecta" });
        }
        //crea un token con la clave secreta
        const token = jwt.sign({
            //añade los datos del usuario en el head del token:
            id: usuario.id,
            nombre: usuario.nombre,
            mail: usuario.mail
        }, "1234", { expiresIn: 180 }); //añade la clave secreta y la expiración

        //responde con el token:
        res.status(200).send({ 
            message: "Inicio de sesión exitoso",
            token 
        });
        //error interno del servidor
    } catch (error) {
        res.status(500).send({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

module.exports = {
    login
};
