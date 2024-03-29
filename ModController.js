import {VERSNELLER, SLEEPTIME, NUMFOODS} from './ModConstants.js';
import {createSnackbar} from './ModFoods.js';
import {createStartSnake} from './ModSnake.js';
import {playerLost, playerWon, draw} from './ModView.js';
import {nieuwSpeelveld} from './ModHelper.js';

/* De controller doet het meeste werk:
/*
/* Actie nemen op basis van invoer uit de view (start, pijltjes toetsen, grootte speelveld vastleggen)
/* View aangeven hoe het verloop van de beurt moet worden ingetekend
/*
/* Starten en stoppen van de beurten. Als er gegeten is door de slang wordt de wachttijd tussen twee beurten verkort.
/*
/* In een beurt probeert de slang te lopen en te eten.
/*
/* De uitkomst van een beurt is verlies (slang loopt uit het veld of tegen zichzelf aan) of winst (alle voedsel elementen zijn opgegeten)
/*
/* Ontkoppelen view en controller data (slang en voedsel)
*/

"use strict";
var snake,snackbar,snakeTimer, sleepTime = SLEEPTIME;   

/**  
* @function creerSpeelveld -> void
* @desc wordt aangeroepen door de view, niet rechtsstreeks naar de helper module, via de controller
*/

function creerSpeelveld(width, height) { // controller creert op aangeven van de view speelveld object

    nieuwSpeelveld( width, height);
}

/**  
* @function DrawableElement -> void
* @desc Ontkoppel snake en food naar de view
*/

function DrawableElement(radius, x,y, color) { // controller moet snake en food objecten ontkoppelen richting view

    this.radius = radius;
    this.x      = x;
    this.y      = y;
    this.color  = color;
}

/**  
* @function spelerWint -> void
* @desc Stop het spel en meldt dat de speler gewonnen heeft
*/
function spelerWint() {
   stop();                                                                                  // controller stopt spel 
   console.log('Gewonnen!');  
   playerWon();                                                                             // view meldt overwinning aan de speler
}
/**  
* @function spelerVerliest -> void
* @desc Stop het spel en meldt dat de speler verloren heeft
*/
function spelerVerliest() {
    stop();                                                                                 // controller stop het spel
    console.log('Helaas verloren');           
    playerLost();                                                                           // view meldt verlies aan de speler
 }

/* Op en doorstarten spel en beurten */
/**  
* @function init -> void
* @desc Start het spel: creer de slang, het eten en trigger de beurten
*/
function init() {                                                                           // start het spel
    console.log("Start het spel");
    snake           = createStartSnake();                                                   // slang op het speelveld zetten 
    snackbar        = createSnackbar(snake);                                                // voedsel op het speelveld plaatsen
    sleepTime       = SLEEPTIME;                                                            // snelheid aan het begin van het spelen weer op traag zetten
    setTimer();
}
/**  
* @function cont() -> void
* @desc Speel het spel verder nadat je het pakketje van de postbezorger hebt aangenomen
*/
function cont() {                                                                           // uitbreiding: verder spelen als je even gestopt bent
    setTimer();
}
/**  
* @function stop -> void
* @desc Zet het spel stil door de Timer af te zetten
*/
function stop() {                                                                           // zet de timer stop (kan hervat worden)
    console.log("Stop");
    clearInterval(snakeTimer);
}
/**  
* @function setTimer -> void
* @desc Start het spelen van de beurten met een bepaalde tussenperiode
*/
function setTimer() {                                                                        // timer zetten om slang te laten bewegen
    snakeTimer = setInterval(function() { playAndAccelerate() }, sleepTime );                // sleepTime wordt herzien in accelerate
}
/**  
* @function playAndAccelerate -> void
* @desc Speel de beurt en versnel als de slang een hapje heeft gegeten
*/
function playAndAccelerate() {                                                                                                   
    var oorspronkelijkeVoorraad = snackbar.voorraad();   
    move(snake, snackbar);
    if ( !snackbar.isEmpty() && ( oorspronkelijkeVoorraad !== snackbar.voorraad() ) ) {      // afleiden of er wat gegeten was, als het voedsel op is geen nieuwe timer starten 
       sleepTime = sleepTime - ( NUMFOODS - snackbar.voorraad() ) * VERSNELLER;              // herbereken (verlaag) wachttijd
       console.log("Accelerate:", sleepTime);                                                // registreer de versnelling in de log na het eten van een hapje
       clearInterval(snakeTimer);
       setTimer();                                                                           // start volgende beurten met verkorte tussenpozen
    }
     
}

/**  
* @function verwerkRichting -> void
* @desc Laat het snake object weten in welke richting bewogen moet worden 
* @param {String} richting Waar de slang naar toe gestuurd wordt
*/
function verwerkRichting( richting ) {                                                        // zet de richting van de slang (klasse attribuut)
     snake.setDirection(richting);
}

/* afhandelen beurt */
/**
 * @function move -> void
 * @desc Probeer de slang te laten lopen en eten
 * @param  {Snake} snake
 * @param  {Element} voedsel
 */
function move(snake,snackbar) {                                                               // laat de slang een stapje verder lopen
     
    if (snake.canMove()) {                                                                    // kijk of de slang nog wel verder kan
       var afgeworpenSegment = snake.doMove(snackbar);                                        // moet teruggezet als slang straks een hapje kan eten zodat de slang groeit
       if ( snake.runInto() ) {
           spelerVerliest();                                                                  // slang loopt tegen zichzelf op
       } else {
                          
            snake.tryToEat(snackbar,afgeworpenSegment);                                        // de slang kijkt of er wat kan worden gegeten
            if ( snackbar.isEmpty() ) {                                                        
               spelerWint();
            }
       } // ontkoppeling naar view maken
       draw( snake.getSegments().map( item => { return new DrawableElement (item.radius, item.x, item.y, item.color ) } ),
             snackbar.getFoods().map( item => { return new DrawableElement (item.radius, item.x, item.y, item.color ) } ) )
    }
    else 
       spelerVerliest();                                                                       // slang liep uit het speelveld => verloren
}

export {creerSpeelveld,DrawableElement, cont, init, stop, move, verwerkRichting};