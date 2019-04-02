var canvas, cpicker, ctx, flag = false,
	        prevX = 0,
	        currX = 0,
	        prevY = 0,
	        currY = 0,
	        size = 2,
	        color = 'red',
	        brush = 'dot',
          dot_flag = false;        

    
function init() {
    canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.8;
    cpicker = document.getElementById('cpicker');
    ctx = canvas.getContext("2d");   //get context, enable ctx to use tons of methods to draw in 2d environment
    canvas.addEventListener("mousemove", function (e) {move(e)}, false);
    canvas.addEventListener("mousedown", function (e) {down(e)}, false);
    canvas.addEventListener("mouseup", function (e) {out(e)}, false);
    canvas.addEventListener("mouseout", function (e) {out(e)}, false);
    document.addEventListener("keydown",function(e) {key(e)},false);
    cpicker.addEventListener('input', function()
    {
    color = '' + this.value;
    onsole.log(color);
    })

}

function draw() {
  ctx.beginPath();
  if (brush === 'line'){
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
  }
  else{
    ctx.arc(currX, currY, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.closePath();
}

function move(e) {
  if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
  }
}

function down(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    flag = true;
    dot_flag = true;

    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }
}
      
function out(e) {
  flag = false;
}
      
function key(e) {
  switch(e.keyCode){
    // space
    case 32:
      clear();
        break;
      // up arrow
    case 38:
      sizeUp();
      break;
    // down arrow
    case 40:
      sizeDown();
      break;
    // yellow
    case 89:
      changeColor("yellow");
      break;
    // g
    case 71:
      changeColor("green");
        break; 
    // r
    case 82:
      changeColor("red");
        break;
    // b
    case 66:
      changeColor("blue");
        break;
    // l for line drawing
    case 76:
      toggleLine();
      break;
  }
}
	    
function sizeUp() {
  size++;
} 
    
function sizeDown() {
  size > 1 ? size-- : size = 1;
} 
    
function toggleLine(){
	brush === 'line' ? brush = 'dot': brush = 'line';
}
		
function changeColor(colorcode) {
  color=colorcode;
} 

		
function clear() {
  ctx.clearRect(0, 0, 800, 500);
}