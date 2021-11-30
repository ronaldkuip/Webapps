function playerWon() {
    const music = new Audio('applause3.mp3');
    music.play();
}
  
function playerLost() {
    const music = new Audio('boo3.mp3');
    music.play();
}

function draw(snake, voedsel) {
  var canvas = $("#mySnakeCanvas").clearCanvas();
  voedsel.forEach(function(hapje) { drawElement(hapje, canvas) } );
  snake.segments.forEach(function(segment) { drawElement(segment, canvas) } );
}

function drawElement(element, canvas) {
    canvas.drawArc({
          draggable : false,
          fillStyle : element.color,
          x : element.x,
          y : element.y,
          radius : element.radius
      });
}

export { playerLost, playerWon, draw} ;