const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { 
        type: String, 
        unique: true, 
        required: [true, 'La descripción es obligatoria'] 
    },
    estado: { 
        type: Boolean, 
        default: true,
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
    // usuario: { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Usuario' 
    // }
});


module.exports = mongoose.model('Categoria', categoriaSchema);