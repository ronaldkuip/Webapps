import {R, FOOD, NUMFOODS, XMIN, YMIN} from './ModConstants.js';
import {Element} from './ModData.js';
 

function createFood(x, y) {
    var element = new Element(R, x, y, FOOD);
    element.collidesWithOneOf = function(segments) {
      var deltaX;
      var deltaY;
      var deltaR;
      for (var i in segments) {
        deltaX = (element.x - segments[i].x) ** 2;
        deltaY = (element.y - segments[i].y) ** 2;
        deltaR = Math.sqrt(deltaX+deltaY);
        if ( deltaR <= 2 * R ) return i; 
      }
      return -1;
    };
    return element;
}

function createFoods(snake, speelveld) {
    var s = speelveld;   
    var t = speelveld.x;
    var  i = 0, food, arrFoods = new Array;
    var  empty = new Array;
    //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
    while (i < NUMFOODS ) {

      food = createFood(XMIN + getRandomInt(0, speelveld.xMax), YMIN + getRandomInt(0, speelveld.yMax));
      if (food.collidesWithOneOf(snake.segments) === -1  && food.collidesWithOneOf(arrFoods) === -1) {
        arrFoods.push(food);
        i++
      }
    }  
    snake.voedsel = arrFoods;
    return arrFoods;
 }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {createFoods};