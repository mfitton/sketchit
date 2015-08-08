$( function (){
  console.log("The init function ran");
  var canvas = $('#practice-screen');
  var ctx = canvas[0].getContext('2d');
  var active = true;
  var drawing = false;
  var index = 0;
  var xpos = [];
  var ypos = [];
  var connected = [];

  //SOCKET STUFF
  socket = io();
  socket.on('new position', function(pos){
    recordPosition(pos['xpos'], pos['ypos'], pos['connect']);
    draw();
  });

  socket.on('clear', function(data){
    clear();
    console.log('received clear');
  });

  canvas.on("mousedown", function(e){
    drawing = true;
    recordPositionAndSend(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
    draw();
  });

  canvas.on("mouseup", function(){
    drawing = false;
  });

  canvas.on("mouseleave", function(){
    drawing = false;
  });

  canvas.on("mousemove", function(e){
    console.log('hit to mousemove, active is '+active);
    if(drawing === true){
      recordPositionAndSend(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      draw();
    }
  });

  if(active === true){
    $('#clear-button').on('click', clear);
    $('#clear-button').on('click', sendClear);
  }


  function recordPosition(x, y, connect){
    xpos.push(x);
    ypos.push(y);
    connected.push(connect);
    // if(active)  sendPosition(x, y, connect);
  }

  function recordPositionAndSend(x, y, connect){
    xpos.push(x);
    ypos.push(y);
    connected.push(connect);
    sendPosition(x, y, connect);
  }

  function sendPosition(x, y, connect){
    socket.emit('new position', {'xpos': x, 'ypos': y, 'connect': connect});
  }

  function draw(){
    while(index < xpos.length){
      ctx.beginPath();
      if(connected[index] && index != 0){
        ctx.moveTo(xpos[index-1], ypos[index-1]);
      }
      else{
        ctx.moveTo(xpos[index]-1, ypos[index]);
      }
      ctx.lineTo(xpos[index], ypos[index]);
      ctx.closePath();
      ctx.stroke();
      index++;
    }
  }

  function clear(){
    console.log("clear clicked");
    xpos = [];
    ypos = [];
    connected = [];
    ctx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
    index = 0;
  }

  function sendClear(){
    socket.emit('clear', {});
  }

  var a = require('./guess.js');
  a();
});
