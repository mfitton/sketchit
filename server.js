var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var verbose = true;
var connectionNum = 1;
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var port = process.env.port || 4000;


io.on('connection', function(socket){
  console.log('A user connected, number: '+connectionNum);
  var id = connectionNum;
  connectionNum++;
  socket.on('new position', function(data){
    if(verbose)  console.log(data);
    socket.broadcast.emit('new position', data);
  });
  socket.on('clear', function(data){
    console.log('emitting a clear');
    socket.broadcast.emit('clear', data);
  });
  socket.on('new guess', function(data){
    if(verbose)  console.log(data);
  });

});

http.listen(port, function(){
  console.log('listening on port ' + port);
});

exports = module.exports = app;
