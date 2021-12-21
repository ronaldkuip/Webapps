import {NUMFOODS, XMIN, YMIN} from './ModConstants.js';
import {createFood,getSpeelveld,getRandomInt} from './ModHelper.js';
"use strict";

/* Bij het definieren van de 'klasse' Snackbar heb ik oop het volgende geprobeerd te letten
/*
/* Createfoods gaf een 'primitive' terug - ik zie dat dat inderdaad minder flexibel is, daarom object Snackbar gemaakt
/* dat het array met voedselsegmenten als private variabele heeft.
/*
/* Alle methodes toegekent aan prototype
/* Alle object variabelen afgeschermd via namespace 'priv'
/* 
/* Alle methodes beginnen met het ophalen van de private variabelen - waar nodig
/* Alle methodes eindigen met het wegschrijven van private variabelen - waar nodig
/* Ik denk dat dat het leven makkelijker maakt als de code naar typescript moet worden omgezet - dat kent vast wel private variabelen
/*
/* De klasse zelf heeft één verantwoordelijkheid - eten


 /**
 * @function createSnackbar -> Snackbar
 * @desc Creeer snackbar
 * @return  {Snackbar} De snackbar vol met snacks
 */
function createSnackbar(snake) {

    return new Snackbar(snake);

}

/**
 * @function createFoods -> Element[]
 * @desc Creeer alle voedselelementen. Een voedsel element mag de slang niet raken. 
 * @param   {Snake} snake
 * @return  {Element} voedsel array
 */
function createFoods(snake) {

    var  i = 0, food, arrFoods = new Array;
    //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
    while (i < NUMFOODS ) {

      food = createFood(XMIN + getRandomInt(0, getSpeelveld().xMax), YMIN + getRandomInt(0, getSpeelveld().yMax));
     
      if ( (food.collidesWithOneOf(snake.priv.getSegments()) === -1 ) && (food.collidesWithOneOf(arrFoods) === -1 ) ) {
        arrFoods.push(food);
        i++
      }
    }  
    return arrFoods;
 }

 /**
 * @function Snackbar -> void
 * @desc Creeer snackbar. In de snackbar liggen alle snacks 
 * @param   {Snake} snake
 */
 function Snackbar(snake) {

  this.priv = (function() { 

    var p_foods = createFoods(snake);
    
    return { getFoods        : function() { return p_foods; }, 
             setFoods        : function(item) { p_foods = item; },
           }
  } () );
 }

 /**
 * @function getFoods -> Element[]
 * @desc Creeer alle voedselelementen. Een voedsel element mag de slang niet raken. 
 * @return  {Element} voedsel array
 */
 Snackbar.prototype.getFoods = function() {

     var foods = this.priv.getFoods();

     return foods;
 }

 /**
 * @function setFoods -> void
 * @desc Overschrijf array met food - alleen voor testen. 
 */
  Snackbar.prototype.setFoods = function(data) { 
    this.priv.setFoods(data);
 }
 /**
 * @function voorraad -> number
 * @desc Geeft aantal nog te eten snacks
 * @return  {number} Aantal snacks in de snackbar
 */
 Snackbar.prototype.voorraad = function() {

  var foods = this.priv.getFoods();

  return foods.length;

}


 /**
 * @function isEmpty -> boolean
 * @desc Geeft aantal of de snackbar leeg is -> voedsel op -> spel klaar
 * @return  {boolean} De snackbar is leeg
 */
  Snackbar.prototype.isEmpty = function() {

    var foods = this.priv.getFoods();
  
    return foods.length === 0;
  
  }
/**
 * @function doEat -> void
 * @desc Verwijder de aangegeven snack uit de snackbar 
 * @param   {number} index van de snack in het foods array
 */
 Snackbar.prototype.doEat = function (index) {

  var foods = this.priv.getFoods();

  foods = foods.filter(function(snack) { return snack !== foods[index] } ) 

  this.priv.setFoods(foods);
 }
export {createFoods,createSnackbar};