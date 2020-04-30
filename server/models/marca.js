var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var marcSchema = new Schema({
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