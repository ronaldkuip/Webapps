import {R,HEAD,UP} from './ModConstants.js';
import {nextPosition,validPosition,createSegment} from './ModData.js';

function createStartSnake(speelveld) {
	var segments   = [createSegment(R + speelveld.x/2, R + speelveld.y/2), 
	                  createSegment(R + speelveld.x/2, speelveld.y/2 - R)];
  return new Snake(segments, speelveld);  
}

function Snake(segments, speeldveld) {
	/* in te vullen */
  
  this.canMove = function(speelveld) { 
    var result = validPosition( nextPosition( segments[segments.length-1], this.direction),speelveld);
    return result;
  }
  
  this.doMove = function(voedsel,speelveld) {
      
    // beweeg de kop naar de nieuwe positie

    var oldSegment = Object.assign({}, segments[segments.length-1]);
    var newSegment = nextPosition( segments[ segments.length-1 ], this.direction);
    segments[segments.length-1].x = newSegment.x;
    segments[segments.length-1].y = newSegment.y;
    var swapSegment = null;

    // schuif alle oude segmenten naar de plaats van hun verplaatste voorganger

    for(var i = segments.length - 2; i >= 0; i-- ) {
       swapSegment = Object.assign({}, segments[i]); // waarschijnlijk geen shallow nodig
       segments[i].x = oldSegment.x;
       segments[i].y = oldSegment.y;
       oldSegment = Object.assign({}, swapSegment); // waarschijnlijk geen shallow nodig
    }

    // ben ik tegen mezelf aangelopen?

    var head = segments[segments.length-1];
    for( i = 0; i < segments.length - 2; i++ ) {
      if ( segments[i].x === head.x && segments[i].y === head.y ) {
        $(document).trigger(($.Event("eventSlangRaaktZichzelf")));
        break;
      }
    }

    // is hier iets te eten?

    for( i in voedsel ) {
      if (voedsel[i].collidesWithOneOf(this.segments) > -1) {   
         // De slag is verplaatst maar omdat er is gegeten komt het oude, verdwenen stukje slang weer terug
         // aan het einde van de slag (positie 0)
         this.segments.unshift(oldSegment);
         voedsel = voedsel.filter(function(x) { return x !== voedsel[i] })
         if ( voedsel.length === 0 ) {
            $(document).trigger(($.Event("eventSpelerWint")));
         }
         break; // Eén enkel brokje per keer
       }
    }
    return voedsel;
  }  
  
  this.direction = UP;    
  this.segments = segments; 
  this.segments[ segments.length - 1].color = HEAD;

}
export {createStartSnake};