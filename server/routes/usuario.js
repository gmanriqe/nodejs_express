const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.js');

const app = express(); 

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0; // req.query ➡️ parametros opcionales (puede venir o no)
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({  })
           .skip(desde)
           .limit(limite)
           .exec((err, usuarios) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err: err
                    });
                }

                res.json({
                    ok: true,
                    usuarios: usuarios
                });
           });
});

app.post('/usuario', (req, res) => {
    // req.body ➡️ obtiene todo los valores enviados por el cuerpo
    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    // .save() ➡️ palabra reservada de mongoose 
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']); // Método de Underscore ➡️pick

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true },(err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete mundo');
});


module.exports = app;