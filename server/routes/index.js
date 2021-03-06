const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./marca'));
app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./compra'));

module.exports = app;