const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido' 
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email : {
        type: String,
        unique: true, // para email unico
        required: [true, 'El correo es necesario.'],
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria.'],
    },
    img: {
        type: String,
        required: false // No es obligatoria
    }, 
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true // tipo Booleano
    },
    google: {
        type: Boolean,
        default: false // tipo Boolean
    }
});

/*
    ⚠️ Para no retornar la contraseña en la respuesta del toJSON ➡️ este método 
    siempre se llamará cuando se intenta imprimir mediante JSON 
*/
usuarioSchema.methods.toJSON = function() {
    console.log(this);
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); // para validar el mensaje de email único
module.exports = mongoose.model('Usuario', usuarioSchema); // 'usuario' es el nombre como se va exportar el modelo usuarioSchema