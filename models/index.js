const {Sequelize} = require("sequelize"); //extrae las funciones de Sequelize para configurar la base de datos
const parameters = require("../config/config");//guarda los parametros de la configuración

//crea el objeto de conexión con la base de datos, pasandole los parametros creados en el archvo config.js
const sequelize = new Sequelize(
    parameters.database,  
    parameters.username,
    parameters.password,
    {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {}; //crea la base de datos

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require("./usuario")(sequelize, Sequelize); //carga el modelo usuario
db.Post = require("./post")(sequelize, Sequelize); //carga el modelo post

// Relaciones entre modelo Usuario y Post
db.Usuario.hasMany(db.Post, { foreignKey: 'id_usuario' }); //indica que un usuario puede tener muchos posts
db.Post.belongsTo(db.Usuario, { foreignKey: 'id_usuario' }); //indica que muchos posts pueden pertenecer solo a un usuario


module.exports = db;//exportamos la base de datos
