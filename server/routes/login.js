let express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.js');

const app = express();

app.post('/login', (req, res) => {

    Usuario.findOne({ email: req.body.email }, (err, usuarioDB) => {
        // Si es un correo válido, el VALOR de usuarioDB mostrará la info del usuario
        // Si no es un correo válido. el VALOR de usuarioDB es NULL o VACÍO
        if(err){
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if(!usuarioDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El (Usuario) o Contraseña no coinciden'
                }
            });
        }

        // Comparamos la contraseña que enviamos con la contraseña de la DB
        if( bcrypt.compareSync(req.body.password, usuarioDB.password)) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El Usuario o (Contraseña) no coinciden'
                }
            });
        }

        // JWT ➡️ ROSADO: Payload - Contiene la información que nosotros queremos que este en el TOKEN
        let token = jwt.sign({ 
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); // 60 segundo, 60 minutos, 24 horas y 30 días

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    });
});
module.exports = app;