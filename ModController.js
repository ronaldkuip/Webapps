import {R, SLEEPTIME} from './ModConstants.js';
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

/* Verwerk richting aangegeven door de pijltjes toetsen */

function setDirection( richting ) {
    snake.direction = richting;
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