import {R,SNAKE,FOOD, STEP, LEFT, RIGHT, UP, DOWN} from './ModConstants.js';
import {getWidth, getHeight} from './ModController.js';

function Element(radius, x, y, color) {
	
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
}

function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}

function xMax() { return getWidth() - R ; }; 
function yMax() { return getHeight() - R ; }; 

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

function nextPosition( element, direction ) {
    var segment = new Element( element.radius, element.x, element.y, element.color );
    
    switch (direction) {
      case LEFT: 
      segment.x = segment.x - STEP;
      break;
      case UP: 
      segment.y = segment.y - STEP; 
      break;
      case RIGHT: 
      segment.x = segment.x + STEP;
      break;
      case DOWN: 
      segment.y = segment.y + STEP;
      break;
    }
    return segment;
  }
  
function validPosition( element ) {
    if ( element.x < 0 || element.x > getWidth())  return false;
    if ( element.y < 0 || element.y > getHeight()) return false;
    return true;
  }
 
export {xMax,yMax,Element, createSegment, createFood, validPosition, nextPosition};