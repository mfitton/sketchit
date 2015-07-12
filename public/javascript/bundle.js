(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./guess.js":2}],2:[function(require,module,exports){
module.exports = function() {
  guessTextBox = $('#guess-box');
  guessSubmitButton = $('#guess-button');
  clientName = 'Max';
  guessSubmitButton.on('click', function(e){
    socket.emit('new guess', {'author': clientName, 'message': guessTextBox.val()});
    console.log('submitting data: '+guessTextBox.val());
    guessTextBox.val('');
  });
  console.log('the guess.js init ran');
  return 1;
}

},{}]},{},[1]);
