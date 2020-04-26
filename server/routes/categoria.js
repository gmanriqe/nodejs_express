const express = require('express');

const Categoria = require('../models/categoria.js');

const app = express();

/**
 * Mostrar todas las categorías
 */
app.get('/categoria', (req, res) => {
    Categoria.find({})
             .exec((err, categorias) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err: err
                    });
                }
                res.json({
                    ok: true,
                    categorias: categorias
                });
             });
});

/**
 * Crear nueva categoría
 */
app.post('/categoria', (req, res) => {
    
    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/**
 * Mostrar una categoría
 */
app.get('/categoria/:id', (req, res) => {
    Categoria.findById({

    });
});

/**
 * Editar una categoría
 */
app.put('/categoria/:id', (req, res) => {
    
});

/**
 * Eliminar un categoría
 */
app.delete ('/categoria/:id', (req, res) => {
    // Solo un administrador puede eliminar una categoría
    //Categoria.findByIdAndRemove
});
module.exports = app;