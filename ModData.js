import {R,SNAKE, STEP, LEFT, RIGHT, UP, DOWN} from './ModConstants.js';


function Element(radius, x, y, color) {
	
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
}

function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
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
  
function validPosition( element, speelveld ) {
    var x = speelveld;
    if (element.x < 0 || element.x > speelveld.x)  return false;
    if (element.y < 0 || element.y > speelveld.y)   return false;
    return true;
  }


export {Element, createSegment, validPosition, nextPosition};