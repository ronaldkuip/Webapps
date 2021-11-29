import {UP, LEFT, RIGHT, DOWN, R, SLEEPTIME} from './ModConstants.js';
import {createFoods} from './ModFoods.js';
import {createStartSnake} from './ModSnake.js';
import {playerLost, playerWon, draw} from './ModView.js';

var speelveld,gegeten,snake,snakeTimer;

/* Afhandelen winst en verlies */
jQuery(document).on("eventSlangRaaktZichzelf", spelerVerliest);
jQuery(document).on("eventSpelerWint", spelerWint);

function spelerWint() {
   stopSnake();
   playerWon();
}

function spelerVerliest() {
    stopSnake();
    playerLost();
 }

 /* Netjes doorgeven afmeldingen van het speelveld via functie calls */

function nieuwSpeelveld( width, height ) {
    speelveld = new Speelveld( width, height, width - R, height - R );
 }
 
 function Speelveld(x, y, xMax, yMax) {
     this.x = x;
     this.y = y;
     this.xMax = xMax;
     this.yMax = yMax;
 }

 /* Opstarten spel */

function startSnake() {
    snake   = createStartSnake(speelveld);
    gegeten = createFoods(snake,speelveld);
    setTimer();
}

function cont() {
    setTimer();
}

function setTimer() {
    snakeTimer = setInterval(function() { 
        gegeten = move(snake,gegeten); 
        draw(snake,gegeten); 
    }, SLEEPTIME);
}

/* Stoppen */
function stopSnake() {
    draw(snake, gegeten);
    clearInterval(snakeTimer);
}

/* Verwerk richting aangegeven door de pijltjes toetsen
   Lopen in de tegenovergestelde richting wordt genegeerd (anders ben je per definitie dood)
*/

function setDirection( richting ) {
  switch (richting) {
    case LEFT : if ( snake.direction !== RIGHT ) { snake.direction = richting; }; break;
    case UP   : if ( snake.direction !== DOWN  ) { snake.direction = richting; }; break;
    case RIGHT: if ( snake.direction !== LEFT  ) { snake.direction = richting; }; break;
    case DOWN : if ( snake.direction !== UP    ) { snake.direction = richting; }; break;
  }
}

/* Beweeg de slag, eet voedsel wat je tegenkomt */

function move(snake,voedsel) {
     
   if (snake.canMove(speelveld)) { 
          voedsel = snake.doMove(voedsel,speelveld);
          draw(snake,voedsel);
    }
    else {
          spelerVerliest();
  }
  return voedsel;
}

export { nieuwSpeelveld, snake, cont, startSnake, stopSnake, move, setDirection};