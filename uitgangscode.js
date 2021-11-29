import { cont, startSnake, stopSnake, snake, setDirection, nieuwSpeelveld} from './ModController.js';
import { R, UP, LEFT, RIGHT, DOWN } from './ModConstants.js';
	
$(document).ready(function() {
	$("#startSnake").click(init);  
  $("#contSnake").click(cont);  
	$("#stopSnake").click(stopSnake);
});

/**
  @function init() -> void
  
  creeer een slang, genereer voedsel, en teken alles
*/
function init() {		

  jQuery(document).keydown(function (e) { 
    switch (e.which) {
    case 37: if ( snake.direction !== RIGHT ) { setDirection(LEFT)  }; break;
    case 38: if ( snake.direction !== DOWN  ) { setDirection(UP)    }; break;
    case 39: if ( snake.direction !== LEFT  ) { setDirection(RIGHT) }; break;
    case 40: if ( snake.direction !== UP    ) { setDirection(DOWN)  }; break;
    } } );
  
  nieuwSpeelveld( $("#mySnakeCanvas").width(), $("#mySnakeCanvas").width() );

  startSnake();
   
}


