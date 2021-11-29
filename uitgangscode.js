import { cont, startSnake, stopSnake, setDirection, nieuwSpeelveld} from './ModController.js';
import { UP, LEFT, RIGHT, DOWN } from './ModConstants.js';

$(document).ready(function() {
  $("#startSnake").click(init);  
  $("#contSnake").click(cont);  
  $("#stopSnake").click(stopSnake);
});

function init() {		

  jQuery(document).keydown(function (e) { 
    switch (e.which) {
    case 37: setDirection(LEFT);  break;
    case 38: setDirection(UP);    break;
    case 39: setDirection(RIGHT); break;
    case 40: setDirection(DOWN);  break;
    } } );
  
  nieuwSpeelveld( $("#mySnakeCanvas").width(), $("#mySnakeCanvas").width() );

  startSnake();
   
}


