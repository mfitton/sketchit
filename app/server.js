var express = require('express');
var UUID = require('uuid');
require('./User.js')();
var app = express();
var jsonParser = require('body-parser').json();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var verbose = true;
var usersLookingForGame = [];



//Combine these eventually
app.set('view engine', 'jade');
app.set('views', __dirname + '/views' );
app.use(express.static('public'));
app.use(jsonParser);

app.get('/', function (req, res) {
  res.render('index.jade');
});

app.post('/sessions/new', function (req, res){
  console.log(req);
  res.render('game.jade');
});

var port = process.env.port || 3400;


io.on('connection', function(socket){
  var id = UUID.v1();
  socket.on('new position', onNewPosition);
  socket.on('clear', onClear);
  socket.on('new guess', onNewGuess);
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});

function onNewPosition(data) {
  if(verbose)  console.log(data);
  this.broadcast.emit('new position', data);
}

function onClear(data){
  console.log('emitting a clear');
  this.broadcast.emit('clear', data);
}

function onNewGuess(data) {
  if(verbose)  console.log('new guess' + data);
  this.broadcast.emit('new guess', data);
}
exports = module.exports = app;

