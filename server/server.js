require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // pasea application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parsea application/json

app.use(require('./routes/usuario'));

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
    console.log('escuchando puerto: ', process.env.PORT);
});