var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var port = process.env.port || 4000;


io.on('connection', function(socket){
  console.log('A user connected');
  socket.emit('news', {hello: 'world'});
  socket.on('new position', function(data){
    console.log(data);
  });
  socket.on('clear', function(data){
    console.log('clear')
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});

exports = module.exports = app;
