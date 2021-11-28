import { cont, startSnake, stopSnake, snake, setDirection } from './ModController.js';
import { R, UP, LEFT, RIGHT, DOWN } from './ModConstants.js';


 
// const R        = 10,          // straal van een element
/*
const STEP     = 2*R,         // stapgrootte
                              // er moet gelden: WIDTH = HEIGHT
 
const LEFT     = "left",      // bewegingsrichtingen 
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",
  
const      NUMFOODS = 15,         // aantal voedselelementen   (rk: was 15, voor het makkelijk)    

const      XMIN     = R,           // minimale x waarde 
      YMIN     = R,           // minimale y waarde 
  
	  SLEEPTIME = 500        // aantal milliseconde voor de timer
    */
/*
      SNAKE   = "DarkRed" ,   // kleur van een slangsegment
      FOOD    = "Olive",       // kleur van voedsel
	    HEAD    = "DarkOrange"   // kleur van de kop van de slang
*/	
                              // voedsel voor de slang
var	width,                    // breedte van het tekenveld
	  height,                   // hoogte van het tekenveld
	  xMax,                     // maximale waarde van x = width - R
	  yMax,                     // maximale waarde van y = height - R rk: stond ymin ip yMin
	  /* direction = UP, */
    snakeTimer;
	
$(document).ready(function() {
	$("#startSnake").click(init);  
  $("#contSnake").click(cont);  
	$("#stopSnake").click(stopSnake);
});

/**
  @function init() -> void
  
  cre\"eer een slang, genereer voedsel, en teken alles
*/
function init() {		

  width = $("#mySnakeCanvas").width();
  height = $("#mySnakeCanvas").height();
  xMax = width - R;
  yMax = height - R;
 

  $("#mySnakeCanvas").clearCanvas()
  //snake = createStartSnake();
  //foods = globalFood(snake); // snake is weg te halen door een ref naar functiecreatie...
  //draw(snake);
  //
  jQuery(document).keydown(function (e) { 
    switch (e.which) {
    case 37: if ( snake.direction !== RIGHT ) { setDirection(LEFT)  }; break;
    case 38: if ( snake.direction !== DOWN  ) { setDirection(UP)    }; break;
    case 39: if ( snake.direction !== LEFT  ) { setDirection(RIGHT) }; break;
    case 40: if ( snake.direction !== UP    ) { setDirection(DOWN)  }; break;
    } } );
  
  startSnake();
   
}
/*
function startSnake() { 
  snakeTimer = setInterval(function() { move(direction); draw(foods) }, SLEEPTIME);
}

function stopSnake() {
  clearInterval(snakeTimer);
}
/**
  @function move(direction) -> void
  @desc Beweeg slang in aangegeven richting
        tenzij slang uit canvas zou verdwijnen  
  @param   {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
**/
/*
function move(direction) {
  if (snake.canMove(direction)) {
		snake.doMove(direction);
		draw(foods,snake);
	}
	else {
		stopSnake();
    playerLost("Je loopt uit het canvas");

	}
}
*/
/**
  @function draw() -> void
  @desc Teken de slang en het voedsel
*/
/*
function draw() {
	var canvas = $("#mySnakeCanvas").clearCanvas();
  for(var i in foods) {
    drawElement( foods[i], canvas);
  }
  for(i in snake.segments) {
    drawElement( snake.segments[i], canvas);
  }
}
*/
/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
/**
   @constructor Snake
   @param {[Element] segments een array met aaneengesloten slangsegmenten
                   Het laatste element van segments wordt de kop van de slang 
*/ 
/* 
function Snake(segments) {
	 
  
  this.canMove = function() { 
    var result = validPosition( nextPosition( segments[segments.length-1], this.direction));
    return result;
  }
  
  this.doMove = function() {
      
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

    var food = null;
    var foods = this.voedsel; // ingevoegd
    for( i in foods ) {
      food = foods[i];
      if (food.collidesWithOneOf(snake.segments) > -1) {
      // slang wordt eentje langer
      var newSegment = determineNewSnakeSegment(this);
      this.segments.unshift(newSegment);
      // food element uit array weghalen
      //var newFoods = foods.filter(function(x) { return x !== food })
      var newFoods = this.voedsel.filter(function(x) { return x !== food })
      // foods = newFoods;
      this.voedsel = newFoods;
      if ( newFoods.length === 0 ) {
        stopSnake();
        playerWon();
      }
      break;
      }
    }
  }  
 
  
  this.direction = UP;
  this.voedsel = null;
  this.segments = segments; 
 
  this.segments[ segments.length - 1].color = HEAD;
}
*/
/**
   @constructor Element
   @param {number} radius straal (rk zelf aangevuld met number)
   @param {number} x x-coordinaat middelpunt
   @param {number} y y-coordinaat middelpunt
   @param {string} color kleur van het element
*/
/*
function Element(radius, x, y, color) {
	
    this.radius = radius;
    this.x = x;
    this.y = y;   
    this.color = color;
}
*/
/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/
 /*
 function determineNewSnakeSegment() {

   var lastSegment = snake.segments[0];
   var prevSegment = snake.segments[1];
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
 */
/* 
 function playerWon() {
  draw();
  const music = new Audio('applause3.mp3');
  music.play();
 }

 function playerLost(melding) {
  draw();
  const music = new Audio('boo3.mp3');
  music.play();
  alert(melding);
 }
 */
/**
  @function createStartSnake() -> Snake
  @desc Slang creëren, bestaande uit  twee segmenten, 
        in het midden van het veld
  @return: slang volgens specificaties
*/
/*
function createStartSnake() {
	var segments   = [createSegment(R + width/2, R + height/2), 
	                  createSegment(R + width/2, height/2 - R)];
  // var segments   = [createSegment(330, 110), 
  //                    createSegment(350, 110)];
  return new Snake(segments);  
    
    // return snake;
}
*/
/**
  @function createSegment(x,y) -> Element
  @desc Slangsegment creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color SNAKE
*/
/*
function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}
*/
/**
  @function createFood(x,y) -> Element
  @desc Voedselelement creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color FOOD
*/
/*
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
*/
/**
  @function drawElement(element, canvas) -> void
  @desc Een element tekenen 
  @param {Element} element een Element object
  @param  {dom object} canvas het tekenveld
*/
/*
function drawElement(element, canvas) {
  canvas.drawArc({
		draggable : false,
		fillStyle : element.color,
		x : element.x,
		y : element.y,
		radius : element.radius
	});
}
*/
/**
  @function getRandomInt(min: number, max: number) -> number
  @desc Creeren van random geheel getal in het interval [min, max] 
  @param {number} min een geheel getal als onderste grenswaarde
  @param {number} max een geheel getal als bovenste grenswaarde (max > min)
  @return {number} een random geheel getal x waarvoor geldt: min <= x <= max

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/
/**
  @function createFoods() -> array met food
  @desc [Element] array van random verdeelde voedselpartikelen
  @return [Element] array met food
*/
/*
function createFoods() {   
   var  i = 0,    
        food;
   var  arrFoods = new Array;

   //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
   while (i < NUMFOODS ) {
     food = createFood(XMIN + getRandomInt(0, xMax), YMIN + getRandomInt(0, yMax));
     if (food.collidesWithOneOf(snake.segments) === -1  && food.collidesWithOneOf(foods) === -1) {
       arrFoods.push(food);
       i++
     }
   }  
   return arrFoods;
}
*/
/*
function nextPosition( element, direction ) {
  var segment = new Element( element.radius, element.x, element.y, element.color );
  
  switch (direction) {
    case LEFT: segment.x = segment.x - STEP;
    break;
    case UP: segment.y = segment.y - STEP; 
    break;
    case RIGHT: segment.x = segment.x + STEP;
    break;
    case DOWN: segment.y = segment.y + STEP;
    break;
  }
  return segment;
}

function validPosition( element ) {
  if ( element.x < 0 || element.x > width ) return false;
  if ( element.y < 0 || element.y > height) return false;
  return true;
}
*/

// export var foods;

