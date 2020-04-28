const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.js');
const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

const app = express(); 

/**
 * Listar usuarios
 */
app.get('/usuario', verificaToken, (req, res) => {
    // req.query ➡️ parametros opcionales (puede venir o no)
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // Usuario.find({ }) ➡️ retorna todos los campos
    Usuario.find({ estado: true }, 'nombre email role estado google img') // ➡️ '' Aquí colocamos que campos deseamos mostrar
           .skip(desde)
           .limit(limite)
           .exec((err, usuarios) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err: err
                    });
                }

                Usuario.count({ estado: true }, (err, conteoRegistros) => {
                    res.json({
                        ok: true,
                        usuarios: usuarios,
                        cuantos: conteoRegistros
                    });
                });
           });
});

/**
 * Registrar un usuario
 */
app.post('/usuario', [verificaToken, verificaAdminRol], (req, res) => {
    // req.body ➡️ obtiene todo los valores enviados por el cuerpo
    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    // .save() ➡️ palabra reservada de mongoose para registrar
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

/**
 * Editar un usuario
 * ⚠️ 
 */
app.put('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']); // Método de Underscore ➡️pick

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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

/**
 * Eliminar un usuario (Físico)
 * Soluciones: 
 * 1️⃣ Podriamos enviar el id por POST y obtenerlo por el body
 * 2️⃣ Podriamos enviarlo por la url y obtenerlo el parametro
 */
app.delete('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioEliminado) { // ➡️ Equivale a (usuarioEliminado === null) 
            res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        })
    });
});

/**
 * Eliminar un usuario (Lógico)
 */
app.put('/usuarioActualizar/:id', (req, res) => {
    let id = req.params.id;
    let cambioEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambioEstado,  { new: true }, (err, usuarioEliminado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioEliminado) { // ➡️ Equivale a (usuarioEliminado === null). Si no existe
            res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        });
    });
});

module.exports = app;