import {R,HEAD, LEFT, RIGHT, UP, DOWN,} from './ModConstants.js';
import {nextPosition,validPosition,createSegment} from './ModData.js';
import {stopSnake,playerWon,playerLost} from './ModController.js';
import {getWidth, getHeight} from './ModController.js';

function createStartSnake() {
	var segments   = [createSegment(R + getWidth()/2, R + getHeight()/2), 
	                  createSegment(R + getWidth()/2, getHeight()/2 - R)];
  return new Snake(segments);  
}

function Snake(segments) {
	/* in te vullen */
  
  this.canMove = function() { 
    var result = validPosition( nextPosition( segments[segments.length-1], this.direction));
    return result;
  }
  
  this.doMove = function(voedsel) {
      
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
        stopSnake();
        playerLost( "Slang raakt zichzelf");
        break;
      }
    }

    // is hier iets te eten?

    for( i in voedsel ) {
      if (voedsel[i].collidesWithOneOf(this.segments) > -1) {   
         var newSegment = this.determineNewSnakeSegment(this);
         this.segments.unshift(newSegment);
         voedsel = voedsel.filter(function(x) { return x !== voedsel[i] })
         if ( voedsel.length === 0 ) {
            stopSnake();
            playerWon();
         }
         break;
       }
    }
    return voedsel;
  }  

  this.determineNewSnakeSegment = function () {

    var lastSegment = this.segments[0];
    var prevSegment = this.segments[1];
    var richting = "";
    if ( lastSegment.x < prevSegment.x ) { richting = LEFT; }
     else {
      if ( prevSegment.x < lastSegment.x ) { richting = RIGHT; } 
        else {
         if ( lastSegment.y < prevSegment.y ) { richting = UP; } 
           else {
             if ( prevSegment.y < lastSegment.y ) { richting = DOWN; } 
               else { alert( "Er klopt iets in determineNewSnakeSegment"); }
           }
        }
       }
    
    var addSegment = nextPosition( lastSegment, richting );
    if ( validPosition( addSegment ) ) {
       return addSegment;
    } else { // Kan denk ik niet voorkomen - nou best wel dus, als je langs de lijnen gedraaid bent
     // oplossing - een kwartslag te draaien, rechtsom, als dat niet werkt, linksom
     // een van die mogelijkheden zou moeten werken
       switch (richting) {
         case DOWN:
         case UP: nieuweRichting = RIGHT; break;
         case LEFT:
         case RIGHT: nieuweRichting = UP; break;
       }
       addSegment = nextPosition( lastSegment, nieuweRichting );
       if ( validPosition( addSegment ) ) {
         console.log("Eerste graads interventie");
         return addSegment;
       } else {
         switch (richting) {
           case DOWN:
           case UP: nieuweRichting = LEFT; break;
           case LEFT:
           case RIGHT: nieuweRichting = DOWN; break;
         }
         addSegment = nextPosition( lastSegment, nieuweRichting );
         if ( validPosition( addSegment ) ) {
           console.log("TWeede graads interventie");
           return addSegment;
         } else {  
             stopSnake();
             playerLost("Kan geen element aan de staart vastmaken");
         }
       }
     }
}
  
  this.direction = UP;
  this.segments = segments; 
  this.segments[ segments.length - 1].color = HEAD;

}



  export {createStartSnake};