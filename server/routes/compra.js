const express = require('express');

const Compra = require('../models/compra');

const app = express();

/**
 * Crear una compra
 */
app.post('/compra', (req, res) => {
    let nuevaCompra = new Compra({
        direccion_entrega   : req.body.direccion_entrega,
        referencia_entrega  : req.body.referencia_entrega,
        coordenada_x        : req.body.coordenada_x,
        coordenada_y        : req.body.coordenada_y,
        estado_compra       : req.body.estado_compra,
        tipo_pago           : req.body.tipo_pago,
        monto_total_compra  : req.body.monto_total_compra,
        usuario             : req.body.usuario,
    });

    nuevaCompra.save((err, compraDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!compraDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            compra: compraDB
        });
    });
});

module.exports = app;