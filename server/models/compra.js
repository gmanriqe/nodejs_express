const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let compraSchema = new Schema({
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    direccion_entrega: { 
        type: String, 
        required: [true, 'La direccion de entrega es obligatoria'] 
    },
    referencia_entrega: { 
        type: String, 
        required: [true, 'La referencia de entrega es obligatoria'] 
    },
    coordenada_x: { 
        type: String, 
        required: [true, 'La coordenada X es obligatoria'] 
    },
    coordenada_y: { 
        type: String, 
        required: [true, 'La coordenada Y es obligatoria'] 
    },
    estado_compra: {
        type: String,
        default: 'ESTADO_RECIBIDO',
        // enum: rolesValidos
    },
    tipo_pago: {
        type: String,
        default: 'PAGO_EFECTIVO',
        // enum: rolesValidos
    },
    monto_total_compra: {
        type: Number,
        default: 0, 
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    }
});


module.exports = mongoose.model('Compra', compraSchema);