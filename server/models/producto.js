var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productoSchema = new Schema({
    nombre: { 
        type: String, 
        required: [
            true, 
            'El nombre es necesario'
        ] 
    },
    precioUni: { 
        type: Number, 
        required: [
            true, 
            'El precio únitario es necesario'
        ] 
    },
    cantidad: {
        type: Number,
        required: [
            true, 
            'La cantidad es necesario'
        ] 
    },
    descripcion: { 
        type: String, 
        required: false
    },
    estado: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    categoria: { 
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: true
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    }
    // usuario: { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Usuario' 
    // }
});


module.exports = mongoose.model('Producto', productoSchema);