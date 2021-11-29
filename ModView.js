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
  for(var i in voedsel) {
    drawElement( voedsel[i], canvas);
  }
  for(i in snake.segments) {

    drawElement( snake.segments[i], canvas);
  }
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