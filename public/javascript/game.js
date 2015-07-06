$( function (){
  console.log("The init function ran");
  var canvas = $('#practice_screen');
  var ctx = canvas[0].getContext('2d');
  var active = false;
  var index = 0;
  xpos = [];
  ypos = [];
  connected = [];
  canvas.on("mousedown", function(e){
    active = true;
    recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
    draw();
  });
  canvas.on("mouseup", function(){
    active = false;
  });
  canvas.on("mouseleave", function(){
    active = false;
  });
  canvas.on("mousemove", function(e){
    if(active === true){
      recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      draw();
    }
  });

  function recordPosition(x, y, connect){
    xpos.push(x);
    ypos.push(y);
    connected.push(connect);
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
});
