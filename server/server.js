require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // pasea application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parsea application/json

app.get('/', (req, res) => {
    res.json('hola mundo');
});

app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else {

    }
    res.json({
        persona: body
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id: id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete mundo');
});


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});