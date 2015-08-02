var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var verbose = true;
var connectionNum = 1;
var users = [];



//Combine these eventually
app.set('view engine', 'jade');
app.set('views', __dirname + '/views' );
app.use(express.static('public'));
app.use(jsonParser);

app.get('/', function (req, res) {
  res.render('layout.jade');
});

app.post('/sessions/new', function (req, res){
  console.log(req);
  res.render('game');
});

var port = process.env.port || 3000;


io.on('connection', function(socket){
  console.log('A user connected, number: '+connectionNum);
  var id = connectionNum;
  connectionNum++;
  socket.on('new position', onNewPosition);
  socket.on('clear', onClear);
  socket.on('new guess', onGuess);
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});

function onNewPosition(data) {
  if(verbose)  console.log(data);
  socket.broadcast.emit('new position', data);
}

function onClear(data){
  console.log('emitting a clear');
  socket.broadcast.emit('clear', data);
}

function onNewGuess(data) {
  if(verbose)  console.log('new guess' + data);
  socket.broadcast.emit('new guess', data);
}
exports = module.exports = app;

