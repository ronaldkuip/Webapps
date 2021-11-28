import {SLEEPTIME} from './ModConstants.js';
import {createFoods} from './ModFoods.js';
import {createStartSnake} from './ModSnake.js';
import {playerLost, playerWon, draw} from './ModView.js';

var gegeten,snake,snakeTimer;

function getWidth()  { return $("#mySnakeCanvas").width(); }
function getHeight() { return $("#mySnakeCanvas").height();}

function startSnake() {
    snake   = createStartSnake();
    gegeten = createFoods(snake);
    snakeTimer = setInterval(function() { 
        gegeten = move(snake,gegeten); 
        draw(snake,gegeten); 
    }, SLEEPTIME);
}

function stopSnake() {
    if ( snake !== undefined ) {
        draw(snake, gegeten);
        clearInterval(snakeTimer);
    }
}

function cont() {
    snakeTimer = setInterval(function() { 
        gegeten = move(snake,gegeten); 
        draw(snake,gegeten); 
    }, SLEEPTIME);
}

function setDirection( richting ) {
    snake.direction = richting;
}

function move(snake,voedsel) {
     
   if (snake.canMove()) { 
          voedsel = snake.doMove(voedsel);
          draw(snake,voedsel);
    }
    else {
          stopSnake(snake);
          playerLost("Je loopt uit het canvas");
  }
  return voedsel;
}

export { cont, getWidth, getHeight, playerLost, playerWon, draw, startSnake, stopSnake, move, snake, setDirection};