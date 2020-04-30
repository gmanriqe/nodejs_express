var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var marcaSchema = new Schema({
    nombre: {
        type: String,
        required: [
            true,
            'El nombre es necesario'
        ]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Marca', marcaSchema);