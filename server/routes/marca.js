const express = require('express');

const Marca = require('../models/marca.js');

const app = express();

/**
 * Listar marcas
 */
app.get('/marca', (req, res) => {
    Marca.find({})
         .exec( (err, marcas) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                marcas: marcas
            });
        });
});

/**
 * Crear una marca
 */
app.post('/marca', verificaToken, (req, res) => {
    let marca = new Marca({
        nombre: req.body.nombre
    });

    marca.save( (err, marcaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!marcaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            marca: marcaDB
        });
    });
});

module.exports = app;