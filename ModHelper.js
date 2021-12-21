import {R,SNAKE, FOOD, STEP, LEFT, RIGHT, UP, DOWN} from './ModConstants.js';
"use strict";

/* Hulpfuncties
/*
/* Het object Element hoeft niet 'beschermd' te worden met private variables - de elementen maken altijd deel uit van objecten die wel beschermd zijn.  
/*
/* Var speelveld wordt gebruikt om te voorkomen dat er op meerdere plekken jQuery moet worden gebruikt (nu alleen in de View)
*/

var speelveld; 
 
/**
 * @function nieuwSpeelveld -> void
 * @desc Creeer het speelveld als singleton object 'speelveld' in deze module
 * @param  {number} width
 * @param  {number} height 
 */
 function nieuwSpeelveld( width, height ) {                                             // Ik probeer hier het speelveld 'onveranderlijk' vast te leggen.
  speelveld = { width : width, height : height, xMax : width - R, yMax : height - R};   // Door alleen een get functie te exporteren is het speelverm beschermd tegen
}                                                                                       // onbedoelde verandering. Speelveld is een (bijna) onvermijderlijke parameter 
                                                                                        // bij het definieren van de slang en het voedsel.(Kan denk ik ook nog wel anders maar 
                                                                                        // dat wordt dan allemaal wel heel erg omslachtig)
/**
 * @function getSpeelveld -> Speelveld
 * @desc Geef speelveld definitie terug
 * @return {Speelveld} speelveld object voor gebruik binnen voedsel dan wel slang definitie  
 */
function getSpeelveld() {
  return speelveld;
}

/**
* @function Element -> Element
* @desc Creeer een element
* @param  {number} radius straal  
* @param  {number} x      middelpunt
* @param  {number} y      middelpunt
* @param  {string} color  kleur
*/
function Element(radius,x,y,color) {

    this.radius = radius;
    this.x      = x;
    this.y      = y;
    this.color  = color;
    
    /**
    * @function collidesWithOneOf -> number
    * @desc Bepaal met welk array element wordt gebotst  
    * @param {Element} segments Array van elementen (voedsel of slang)  
    * @return{number} Array index naar segments, -1 betekent niet gevonden
     */
}    

Element.prototype.collidesWithOneOf = function(segments) {                                        // methodes niet in de constructor definieren maar in het prototype                                                            
    var collides = -1;                                                                
    segments.every( (segment) => {                                                               // arrow functie om this binnen scope van every te brengen                                                   
      if (Math.sqrt((this.x - segment.x) ** 2 +  (this.y - segment.y) ** 2) > 2 * R)             // eindelijk af van dat that = this gedoe
          return true;                                                                           // every itereert verder 
      else 
          collides = segments.indexOf(segment);                                                  // every stopt omdat geen true wordt geretourneerd  
      });
    return collides;                                                                             // soms nodig als 'bool' soms als 'index' (zie eten bij snake)
}

/**
   * @function snakeHead() -> item
   * @desc non destructive pop
   * @return {item} any item
   */
  
  function snakeHead(rij) {

    var result = null;
    if ((rij !== undefined) && (rij.length != 0 )) 
       result = rij[rij.length-1];

    return result;
  }

/** 
 * @function createFood -> Element
 * @desc Creeer een element dat een brokje voedsel voorstelt
 * @param  {number} x coordinaat middelpunt
 * @param  {number} y coordinaat middelpunt
 * @return {Element} voedselbrokje
 */
function createFood(x, y) {                                                                                      
  return new Element(R, x, y, FOOD);   
}

/**
 * @function createSegment -> Element
 * @desc Creeer een element dat een stuk van de slang voorstelt
 * @param  {number} x coordinaat middelpunt
 * @param  {number} y coordinaat middelpunt
 * @return {Element} segment van de slag
 */

function createSegment(x, y) {                                                           // default snake segment maken 
	return new Element(R, x, y, SNAKE);
}

/**
 * @function nextPosition -> Element
 * @desc Creeer een element voor de volgende positie van de slag
 * @param  {Element} element huidige kop van de slang
 * @param  {String}  direction looprichting van de slang
 * @return {Element} nieuw slangsegment 
 */
function nextPosition( element, direction ) {                                            // berekenen positie waar de slang naar toeloopt

    var segment = new Element( element.radius, element.x, element.y, element.color );    // kopieer het object
    
    switch (direction) {                                                                 // werk coordinaat bijaan de hand van de richting
      case LEFT : segment.x = segment.x - STEP; break; 
      case UP   : segment.y = segment.y - STEP; break;
      case RIGHT: segment.x = segment.x + STEP; break;
      case DOWN : segment.y = segment.y + STEP; break;
    }
    return segment;
  }
  
/**
 * @function validPosition -> Boolean
 * @desc Kijk of een element buiten het bord valt
 * @param  {Element} element 
 * @return {Boolean} element valt binnen het bord
 */
function validPosition( element ) {                                                       // kijk of een element buiten het speelveld valt

    return ! ( (element.x < 0 || element.x > speelveld.width) || 
               (element.y < 0 || element.y > speelveld.height) 
             );

}

/**
 * @function getRandomInt -> Int
 * @desc Genereer een random number binnen de grenzen van min en max 
 * @param  {number} min
 * @param  {number} max
 * @return {number} randomnumber
 */
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {getRandomInt, createFood, createSegment, validPosition, nextPosition, nieuwSpeelveld, getSpeelveld, snakeHead};