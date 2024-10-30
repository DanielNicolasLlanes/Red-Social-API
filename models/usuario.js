//se crea una funcion para el usuario, con dos parametros, uno el objeto de conexion y otro para configurar Sequelize
const Usuario = (sequelize, Sequelize) => {
    return sequelize.define("Usuario",{   //primero define como se llamara el modelo, al cual al final le agrega una "s"
        //Aquí se configuran los campos que tendrá un usuario, nombre, mail, nickname, contraseña, avatar:
        nombre: {      
            type: Sequelize.STRING, //indica que el valor en la base de datos será de tipo string
            allowNull: false,       //no permite que este dato se omita cuando se añade un registro
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,          //indica que para cada registro, este valor tiene que ser único, no debe repetirse ni compartirse con otro registro
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        /*
        hooks: {
            beforeCreate: async(Usuario) => {
                if (Usuario.password) {
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
            beforeUpdate: async(Usuario) => {
                if (Usuario.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
        },*/
    })
}

module.exports = Usuario;