import {R,HEAD,SNAKE,LEFT,RIGHT,UP,DOWN} from './ModConstants.js';
import {nextPosition,validPosition,createSegment,getSpeelveld,snakeHead} from './ModHelper.js';
"use strict";

/* In deze module 'leeft' het object slang. Bij het definieren van de 'klasse' Slang heb ik oop het volgende geprobeerd te letten
/*
/* Alle methodes toegekent aan prototype
/* Alle object variabelen afgeschermd via namespace 'priv'
/* 
/* Alle methodes beginnen met het ophalen van de private variabelen - waar nodig
/* Alle methodes eindigen met het wegschrijven van private variabelen - waar nodig
/* Ik denk dat dat het leven makkelijker maakt als de code naar typescript moet worden omgezet - dat kent vast wel private variabelen
/*
/* De klasse zelf heeft wel twee verantwoordelijkheden - lopen en eten, dat zou ik wellicht moeten scheiden maar is denk ik nog net niet 'bloated'

/**
 * @function createStartSnake() -> Snake
 * @desc Definieer de slag waarmee het spel begint (kop en 1 staartsegment)
 */
function createStartSnake() { // beginslang bestaat uit twee segmenten
	
   return new Snake([createSegment(R + getSpeelveld().width/2, R + getSpeelveld().height/2), 
	                    createSegment(R + getSpeelveld().width/2, getSpeelveld().height/2 - R)]);
}

/**
* @function Snake -> Snake
* @desc Creeer een slang object
* @param {Element} segments segmenten waaruit de slang is opgebouw
*/

function Snake(segments) 
              { // Had ook als function gekund, en dan weer in twee varianten
              // (1) object variables en methodes via this. definieren
              // (2) object variables via object.prototype toevoegen
              // Ik zie daar hiet de toepassing niet van: er is geen reden om te denken dat het
              // slang object meer dan 1 keer wordt aangemaakt
	
    this.priv = (function() { 

      var p_direction = UP;
      var p_segments  = segments; 
      p_segments[1].color = HEAD;

      
      return { getDirection    : function() { return p_direction; }, 
               setDirection    : function(item) { p_direction = item; },
               getSegments     : function() { return p_segments;}, 
               setSegments     : function(item) { p_segments = item ;},
             }

    
    } () );
}    

  
  /**
   * @function getSegments() -> segments[]
   * @desc getter
   * @return {Segment} segments[]
   */
  
  Snake.prototype.getSegments = function() { return this.priv.getSegments(); }
  /**
   * @function canMove() -> Boolean
   * @desc Controleer of de slang bij de volgende beweging binnen het canvas blijft
   * @return {Booelan} Slang kan verder bewegen
   */

    /**
   * @function setSegments() -> void
   * @desc setter - alleen om te kunnen testen
   */
  
  Snake.prototype.setSegments = function(data) { this.priv.setSegments(data); }
     /**
      * @function canMove() -> Boolean
      * @desc Controleer of de slang bij de volgende beweging binnen het canvas blijft
      * @return {Booelan} Slang kan verder bewegen
      */

  Snake.prototype.canMove = function() {     
    
    var segments = this.priv.getSegments();
    var direction = this.priv.getDirection();
    
    return validPosition( nextPosition( snakeHead(segments), direction)); // controleer of de slang verder kan lopen
    
  } 
  
   /**
   * @function runInto -> Boolean
   * @desc kijk of de slang over zichzelf heen loopt
   * @return {Boolean} slang loopt tegen zichzelf aan
   */
  Snake.prototype.runInto = function() {

    var segments = this.priv.getSegments();

    var head = snakeHead(segments);                                                // alleen beschouwen wat er met het kopsegment gebeurt
    var result = false;                                                            // break, geen 'return true' constructie
    for(var i = 0; i < segments.length - 2; i++ ) {                                // geen forEach - ik wil niet tegen mijn eigen hoofd aanlopen
      if ( segments[i].x === head.x && segments[i].y === head.y ) {                                     
        result = true; break;                                                                            
      }
    } 
    return result; 
  }

   /**
   * @function tryToEat  -> void
   * @desc Laat de slang proberen iets te eten. Als er iets te eten is wordt er een snack verwijderd uit de snackbar 
   * @param  {Snackbar} snackbar
   * @param  {Segment} segment
   
   */
  Snake.prototype.tryToEat = function(snackbar,afgeworpenSegment) { 

    var segments = this.priv.getSegments();

    var index = snakeHead(segments).collidesWithOneOf(snackbar.getFoods());
    if ( index !== -1 ) {                                                                         // is er iets te eten
      segments.unshift(afgeworpenSegment);                                                        // slang langer maken door tijdens lopen verwijderd segment terug te plaatsen
      snackbar.doEat(index);                                                                      // voedselbrokje uit het array weghalen
    }
    this.priv.setSegments(segments);
  }

  /**
   * @function doMove -> void
   * @desc Beweeg de slang
   */
  
  Snake.prototype.doMove = function() {

      var segments = this.priv.getSegments();
      var direction = this.priv.getDirection();

      segments.push( nextPosition( snakeHead(segments), direction) );                               // kopieer kop segment en zet dat voor de kop
      segments[ segments.length-2 ].color = SNAKE;                                                  // kleur van de oude kop corrigeren
      var afgeworpenSegment = segments[0];                                                          // laatste deel slang bewaren om terug te plaatsen als er gegeten wordt
      segments.shift() ;

      this.priv.setSegments(segments);

      return afgeworpenSegment;                                                                     // afgeworpen stukje nodig als slang groeit na het eten van een brokje

  } 
   
  /**  
  * @function getDirection -> String
  * @desc Haal de richting van de slang op - alleen voor testen
  * @param {String} richting waar de slang naar toe gestuurd wordt
  */
  
  
  Snake.prototype.getDirection = function() { return this.priv.getDirection(); }

  /*
  * @function setDirection -> void
  * @desc Verwerk de aangegeven richting in het snake object 
  * @param {String} richting waar de slang naar toe gestuurd wordt
  */
  Snake.prototype.setDirection = function( richting ) {                                                              // zet de richting van de slang (klasse attribuut) 

     var direction = this.priv.getDirection();

     switch (richting) {
        case LEFT : if ( direction !== RIGHT ) { direction = richting; }; break;        // millenial versie: een toets in de tegenovergestelde richting wordt genegeerd
        case UP   : if ( direction !== DOWN  ) { direction = richting; }; break;        // niet leuk om zo 'dood' te gaan    
        case RIGHT: if ( direction !== LEFT  ) { direction = richting; }; break;
        case DOWN : if ( direction !== UP    ) { direction = richting; }; break;   
    } 
    this.priv.setDirection( direction);

  } 

export {createStartSnake};