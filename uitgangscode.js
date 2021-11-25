const R        = 10,          // straal van een element
      STEP     = 2*R,         // stapgrootte
                              // er moet gelden: WIDTH = HEIGHT
      LEFT     = "left",      // bewegingsrichtingen 
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",

      NUMFOODS = 3          // aantal voedselelementen   (rk: was 15, voor het makkelijk)    

      XMIN     = R,           // minimale x waarde 
      YMIN     = R,           // minimale y waarde 
	  
	  SLEEPTIME = 500,        // aantal milliseconde voor de timer

      SNAKE   = "DarkRed" ,   // kleur van een slangsegment
      FOOD    = "Olive",       // kleur van voedsel
	    HEAD    = "DarkOrange"   // kleur van de kop van de slang
	
var snake,
    foods = [],                                // voedsel voor de slang
	width,                    // breedte van het tekenveld
	height,                   // hoogte van het tekenveld
	xMax,                     // maximale waarde van x = width - R
	yMax,                     // maximale waarde van y = height - R rk: stond ymin ip yMin
	direction = UP;
	
$(document).ready(function() {
	$("#startSnake").click(init);  
	$("#stopSnake").click(stop);
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
  //var test = new Element(2,1,1,SNAKE);
  //console.log(test);

  var slang = createStartSnake();
  console.log(slang);
  foods = createFoods();
  console.log( "Aantal objecten in foods:", foods.length);
  console.log(foods);
}

/**
  @function move(direction) -> void
  @desc Beweeg slang in aangegeven richting
        tenzij slang uit canvas zou verdwijnen  
  @param   {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
function move(direction) {
	if (snake.canMove(direction)) {
		snake.doMove(direction);
		draw();
	}
	else {
		console.log("snake cannot move " + direction);
	}
}

/**
  @function draw() -> void
  @desc Teken de slang en het voedsel
*/
function draw() {
	var canvas = $("#mySnakeCanvas").clearCanvas();
	/* in te vullen */
}
/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
/**
   @constructor Snake
   @param {[Element] segments een array met aaneengesloten slangsegmenten
                   Het laatste element van segments wordt de kop van de slang 
*/ 
function Snake(segments) {
	/* in te vullen */
  this.segments = segments; /* zet segments array van elementen als object attribuut */
  /* rk: Snake wordt aangeroepen met create snake - die functie maakt geen onderscheid tussen kop en staart */
  this.segments[ segments.length - 1].color = HEAD;
}

/**
   @constructor Element
   @param {number} radius straal (rk zelf aangevuld met number)
   @param {number} x x-coordinaat middelpunt
   @param {number} y y-coordinaat middelpunt
   @param {string} color kleur van het element
*/
function Element(radius, x, y, color) {
		/* in te vullen: rk - niet meer dan object attributen zetten */
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
}
/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/
 
/**
  @function createStartSnake() -> Snake
  @desc Slang creëren, bestaande uit  twee segmenten, 
        in het midden van het veld
  @return: slang volgens specificaties
*/
function createStartSnake() {
	var segments   = [createSegment(R + width/2, R + height/2), 
	                  createSegment(R + width/2, height/2 - R)];
    snake = new Snake(segments);  
    /* rk: toegevoegd */
    return snake;
}
/**
  @function createSegment(x,y) -> Element
  @desc Slangsegment creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color SNAKE
*/
function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}
/**
  @function createFood(x,y) -> Element
  @desc Voedselelement creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color FOOD
*/
function createFood(x, y) {
  var rr = new Element(R, x, y, FOOD);
  rr.collidesWithOneOf = function(segments) {
    var deltaX;
    var deltaY;
    for (i in segments) {
      deltaX = (rr.x - segments[i].x) ** 2;
      deltaY = (rr.y - segments[i].y) ** 2;
      deltaR = Math.sqrt(deltaX+deltaY);
      if ( deltaR <= 2 * R ) return true; 
    }
    return false;
  };
  return rr;
  // rk oorspronkelijk gegeven - return new Element(R, x, y, FOOD);
}
/**
  @function drawElement(element, canvas) -> void
  @desc Een element tekenen 
  @param {Element} element een Element object
  @param  {dom object} canvas het tekenveld
*/
 function drawElement(element, canvas) {
	canvas.drawArc({
		draggable : false,
		fillStyle : element.color,
		x : element.x,
		y : element.y,
		radius : element.radius
	});
}

/**
  @function getRandomInt(min: number, max: number) -> number
  @desc Creeren van random geheel getal in het interval [min, max] 
  @param {number} min een geheel getal als onderste grenswaarde
  @param {number} max een geheel getal als bovenste grenswaarde (max > min)
  @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  @function createFoods() -> array met food
  @desc [Element] array van random verdeelde voedselpartikelen
  @return [Element] array met food
*/
function createFoods() {   
   var  i = 0,    
        food;
   
   //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
   while (i < NUMFOODS ) {
     food = createFood(XMIN + getRandomInt(0, xMax), YMIN + getRandomInt(0, yMax));
     if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(foods) ) {
       foods.push(food);
       i++
     }
   }  
   /* rk: toegevoegd */
   return foods;
}

