var express = require('express');
var app = express();

app.use(express.static('public'));

var port = process.env.port || 4000;

app.listen(port);


exports = module.exports = app;
