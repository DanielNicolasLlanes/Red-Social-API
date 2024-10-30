const {Sequelize} = require("sequelize"); //extrae las funciones de Sequelize para configurar la base de datos
const parameters = require("../config/config");//guarda los parametros de la configuración

//creamos el objeto de conexión con la base de datos
const sequelize = new Sequelize(
    parameters.database,
    parameters.username,
    parameters.password,
    {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("./usuario")(sequelize, Sequelize);

module.exports = db;//exportamos la base de datos