require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser'); 

app.use(allowCrossDomain);

// Middleware ➡️ pasea application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parsea application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        xgitres.send(200);
    }
    else {
      next();
    }
};

/*
    node:11145) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
    Solución: { useUnifiedTopology: true, useNewUrlParser: true }
*/
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if(err){
        throw err;
    }else {
        console.log('Base de Datos ONLINE');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});