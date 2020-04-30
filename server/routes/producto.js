const express = require('express');

const Producto = require('../models/producto.js');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

/**
 * Listar productos
 */
app.get('/productos', (req, res) => {
    // - trae todos los productos
    // - populate: Usuario y Categoria
    // - paginado
    Producto.find({})
             .populate('categoria')
            //  .populate('usuario')
             .exec((err, productos) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    productos: productos
                });
             });
});

/**
 * Mostrar un producto por ID
 */
app.get('/productos/:id', (req, res) => {
    // - populate: Usuario y Categoria
    // - paginado
});


/**
 * Crear un producto
 */
app.post('/productos', verificaToken, (req, res) => {
    // - grabar el producto
    // - grabar la marca
    // - grabar la categoría
    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        cantidad: req.body.cantidad,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        categoria: req.body.categoria,
        marca: req.body.marca,
        // usuario: req.usuario._id,
    });

    // console.log(producto);
    producto.save((err, productoDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoDB
        });
    });
});

/**
 * Editar un producto
 */
app.put('/productos/:id', (req, res) => {
    // - grabar el producto
    // - grabar la categoría
});

/**
 * Eliminar un producto (Eliminación lógica con el atributo disponible a false)
 */
app.delete('/productos/:id', (req, res) => {
    // - grabar el producto
    // - grabar la categoría
});


module.exports = app;
