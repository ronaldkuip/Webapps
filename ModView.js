import { creerSpeelveld, cont, init, stop, verwerkRichting} from './ModController.js';
import { UP, LEFT, RIGHT, DOWN } from './ModConstants.js';

"use strict";

$(document).ready(function() {                    //Buttons laten verwijzen naar functies
  $("#startSnake").click(startSpel);  
  $("#contSnake").click(cont);                    //Uitbreiding - spel weer verder spelen als er tussentijds is gestopt
  $("#stopSnake").click(stop);
});

/**
 *  @function startSpel() -> void
 *  @desc Definieer speelveld op basis van canvas en begin het spel
 */

function startSpel() {		

  jQuery(document).keydown(function (e) {         //Ingedrukte toets lezen
    switch (e.which) {                            //alles behalve de pijltjes toetsen negeren
    case 37: verwerkRichting(LEFT);  break;
    case 38: verwerkRichting(UP);    break;
    case 39: verwerkRichting(RIGHT); break;
    case 40: verwerkRichting(DOWN);  break;
    } } );

  // Geen globale variabelen, om de dimensies van het canvas niet telkens op te vragen 
  // (dat 'mag' alleen in de view denk ik) maak ik singleton object aan in de helper module
  // Dat object kan alleen maar benaderd worden met een get functie zodat de speelveld variabelen
  // beschermd zijn.

  creerSpeelveld( $("#mySnakeCanvas").width(), $("#mySnakeCanvas").height() );

  // Laat de controller het spel starten
  init();
   
}

/**
 * @function playerWon() -> void
 * @desc Speel gejuich af
 */
function playerWon() {                              
    const music = new Audio('applause3.mp3');
    music.play();
}
  
/**
 *  @function playerLost() -> void
 *  @desc Speel boegroep af
 */
function playerLost() {
    const music = new Audio('boo3.mp3');
    music.play();
}
/**
 * @function draw() -> void
 * @desc Schoon het canvas en teken de slang en het voedsel opnieuw
 * @param  {Snake}   snake   slang object
 * @param  {Element} voedsel array van voedsel elementen
 */


function draw(snake, voedsel) {  // canvas schonen, brokjes voedsel en slag tekenen
  var canvas = $("#mySnakeCanvas").clearCanvas();
  voedsel.forEach(function (hapje) { drawElement(hapje, canvas); } );
  snake.forEach(function (segment) { drawElement(segment, canvas); } );
}
/**
 * @function drawElement() -> void
 * @desc Teken een element op het canvas
 * @param  {Element} element
 * @param  {}  canvas deel van het scherm waarop getekend wordt
 */

function drawElement(element, canvas) { // teken een brokje voedsel of een slangsegment
    canvas.drawArc({
          draggable : false,
          fillStyle : element.color,
          x : element.x,
          y : element.y,
          radius : element.radius
      });
}



export { playerLost, playerWon, draw} ;