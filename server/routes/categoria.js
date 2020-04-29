const express = require('express');

const Categoria = require('../models/categoria.js');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

/**
 * Listar categorías
 */
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
             .sort('descripcion')
             //.populate('usuario') // populate() ➡️ Se encarga de revisar que ObjectId cargamos y nos mostrará información adicional que hizo referencia
             .populate('usuario', ' email nombre ') // populate() ➡️ Como segundo argumento le mando los nombres de los atributos de la tabla que solo quiero mostrar
             .exec((err, categorias) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err: err
                    });
                }

                Categoria.count( { estado: true }, (err, conteoCategoria) => {
                    res.json({
                        ok: true,
                        categorias: categorias,
                        cuanto: conteoCategoria
                    });
                });
             });
});

/**
 * Crear una categoría
 * ⚠️ Debe regresar la nueva categoría creada
 */
app.post('/categoria', verificaToken, (req, res) => {
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

        if (!categoriaDB) { // Equivale a (categoriaDB === null). Si no existe
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
 * Mostrar una categoría por ID
 */
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById( id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) { // Equivale a (categoriaDB === null). Si no existe
            return res.status(400).json({
                ok: false,
                message: 'El id no existe'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/**
 * Editar una categoría
 */
app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;

    let descCategoria = {
        descripcion: req.body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) { // Equivale a (categoriaDB === null). Si no existe
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
 * Eliminar una categoría
 * ⚠️ Solo un administrador puede eliminar una categoría
 */
app.delete ('/categoria/:id', (req, res) => {
    //Categoria.findByIdAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaEliminado) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaEliminado) { // ➡️ Equivale a (categoriaEliminado === null). Si no existe
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoría borrada'
        });
    });
});
module.exports = app;