import {nieuwSpeelveld,createFood,nextPosition,validPosition,createSegment,getSpeelveld,getRandomInt} from '../ModHelper.js';
import {createStartSnake} from '../ModSnake.js';
import {createSnackbar,createFoods} from '../ModFoods.js';
import {R,HEAD,FOOD,SNAKE,UP,DOWN,LEFT,RIGHT,NUMFOODS} from '../ModConstants.js';

QUnit.test('nieuwSpeelveld, createSnake, createSnackbar' , function (assert) {
    expect(4);

    var modelSpeelveld = { width : 100, height : 200, xMax : 90, yMax : 190 }
    nieuwSpeelveld(100,200);
    var veld = getSpeelveld();
    assert.propEqual( veld, modelSpeelveld, 'speelveld volgens verwachting' );
    
    var modelSegments = [ createSegment(60,110) , createSegment(60,90) ];
    modelSegments[1].color = HEAD;
                        
    var snake = createStartSnake();
    assert.ok( ( snake.getDirection() ===  UP), 'richting slang volgens verwachting');
    assert.propEqual( snake.getSegments(), modelSegments, 'slang segmenten volgens verwachting');

    var snackbar = createSnackbar(snake);
    assert.ok( ( snackbar.voorraad() ===  NUMFOODS ), 'aantal voedselelementen volgens verwachting');

});

QUnit.test('nieuwSpeelveld - andere parameters ander speelveld' , function (assert) {
    expect(2);

    var modelSpeelveld = { width : 100, height : 200, xMax : 90, yMax : 190 }
    nieuwSpeelveld(101,200);
    var veld = getSpeelveld();
    assert.notPropEqual( veld, modelSpeelveld, 'breedte speelveld fout' );
    
    var modelSpeelveld = { width : 100, height : 201, xMax : 90, yMax : 190 }
    nieuwSpeelveld(100,201);
    var veld = getSpeelveld();
    assert.notPropEqual( veld, modelSpeelveld, 'hoogte speelveld fout' );

});


QUnit.test('createSnake - andere parameters andere slang' , function (assert) {
    expect(5);

    var modelSpeelveld = { width : 100, height : 200, xMax : 90, yMax : 190 }
    nieuwSpeelveld(100,200);
    var veld = getSpeelveld();

    var modelSegments = [ createSegment(61,110) , createSegment(60,90) ];
    modelSegments[1].color = HEAD;                     
    var snake = createStartSnake();
    console.log("Slang", snake);
    assert.notPropEqual( snake.getSegments, modelSegments, 'afwijkende x coordinaat in eerste segment');

    var modelSegments = [ createSegment(60,111) , createSegment(60,90) ];
    modelSegments[1].color = HEAD;
    var snake = createStartSnake();
    console.log("Slang", snake);
    assert.notPropEqual( snake.getSegments, modelSegments, 'afwijkende y coordinaat in eerste segment');

    var modelSegments = [ createSegment(60,110) , createSegment(61,90) ];
    modelSegments[1].color = HEAD;                   
    var snake = createStartSnake();
    console.log("Slang", snake);
    assert.notPropEqual( snake.getSegments, modelSegments, 'afwijkende x coordinaat in tweede segment');

    var modelSegments = [ createSegment(60,110) , createSegment(60,91) ];
    modelSegments[1].color = HEAD;               
    var snake = createStartSnake();
    console.log("Slang", snake);
    assert.notPropEqual( snake.getSegments, modelSegments, 'afwijkende y coordinaat in tweede segment');
     
    nieuwSpeelveld(200,300);
    var veld = getSpeelveld();

    var modelSegments = [ createSegment(60,110) , createSegment(60,90) ];
    modelSegments[1].color = HEAD;                     
    var snake = createStartSnake();
    console.log("Slang", snake);
    assert.notPropEqual( snake.getSegments, modelSegments, 'anders speelveld, andere slang');

});

QUnit.test('Next Position' , function (assert) {

    expect(4);

    var segment = createSegment(10,20);

    var s_LEFT = createSegment(-10,20);
    var s_RIGHT = createSegment(30,20);
    var s_UP = createSegment(10,0);
    var s_DOWN = createSegment(10,40);  

    assert.propEqual(nextPosition(segment,LEFT),s_LEFT,'Beweging naar links');
    assert.propEqual(nextPosition(segment,RIGHT),s_RIGHT,'Beweging naar rechts');
    assert.propEqual(nextPosition(segment,UP),s_UP,'Beweging naar boven');
    assert.propEqual(nextPosition(segment,DOWN),s_DOWN,'Beweging naar beneden');

});

QUnit.test('Valid Position' , function (assert) {
    
    expect(6);

    nieuwSpeelveld(100,200);
    
    var s_plusplus = createSegment(10,10);
    var s_plusmin  = createSegment(10,-10);
    var s_minplus  = createSegment(-10,10);
    var s_minmin   = createSegment(-10,-10);
    var s_zeroplus = createSegment(0,10);
    var s_pluszero = createSegment(10,0);
 
    assert.ok(validPosition(s_plusplus),'twee positieve coordinaten okay');
    assert.ok(!validPosition(s_plusmin),'tweede coordinaat negatief mag niet');
    assert.ok(!validPosition(s_minplus),'eerste coordinaat negatief mag niet');
    assert.ok(!validPosition(s_minmin),'beide coordinaten negatief mag niet');
    assert.ok(validPosition(s_zeroplus),'eerste coordinaat nul okay');
    assert.ok(validPosition(s_pluszero),'tweede coordinaat nul okay');
    
});

QUnit.test('canMove' , function (assert) {
    expect(6);

    function prepareSnake( snake, testSegment, direction) {

        var segments = snake.getSegments();
        segments[1].x = testSegment.x;
        segments[1].y = testSegment.y;
        snake.setSegments(segments);
        switch( direction ) {
           case DOWN  : snake.setDirection(LEFT); break;
           case UP    : snake.setDirection(LEFT); break;
           case RIGHT : snake.setDirection(UP); break; 
           case LEFT  : snake.setDirection(UP); break;
        }
        snake.setDirection(direction);
    }

    nieuwSpeelveld(100,200);
    var snake = createStartSnake();

    var s_legaal_1 = createSegment(80,120);
    var s_legaal_2 = createSegment(60,100);
    var s_boven    = createSegment(10,10);
    var s_onder    = createSegment(10,190);
    var s_links    = createSegment(10,30);
    var s_rechts   = createSegment(90,50);


    prepareSnake( snake, s_legaal_1, RIGHT);
    assert.ok(snake.canMove(),'Slang beweegt naar rechts en blijft binnen het kader');

    prepareSnake( snake, s_legaal_2, RIGHT);
    assert.ok(snake.canMove(),'Slang beweegt naar rechts en blijft binnen het kader');

    prepareSnake( snake, s_boven, UP);
    assert.ok(!snake.canMove(),'Slang beweegt naar boven en loopt uit het kader');

    prepareSnake( snake, s_onder, DOWN);
    assert.ok(!snake.canMove(),'Slang beweegt naar beneden en loopt uit het kader');

    prepareSnake( snake, s_links, LEFT);
    console.log(snake);
    assert.ok(!snake.canMove(),'Slang beweegt naar links en loopt uit het kader');
    console.log(snake);

    prepareSnake( snake, s_rechts, RIGHT);
    assert.ok(!snake.canMove(),'Slang beweegt naar rechts en loopt uit het kader');

});

QUnit.test('doMove' , function (assert) {
    expect(4);

    nieuwSpeelveld(100,200);
    
    function prepareSnake( snake, x1,y1,x2,y2, direction) {

        var segments = snake.getSegments();
        segments[0].x -= x1;
        segments[0].y -= y1;
        segments[1].x -= x2;
        segments[1].y -= y2;
        snake.setSegments(segments);
        snake.setDirection(direction);
    }

    var snake = createStartSnake();
    var snake_up = createStartSnake();
    prepareSnake( snake_up, 0,20,0,20, UP) 
    snake.doMove();
    assert.propEqual(snake,snake_up,'Opwaarts gerichte slang, ga naar boven');

    var snake = createStartSnake();
    var snake_up = createStartSnake();
    prepareSnake( snake_up, 0,-20,0,-20, UP);
    snake.setDirection(DOWN);
    snake.doMove();
    assert.propEqual(snake, snake_up,'Opwaarts gerichte slang, naar beneden gaan onzinnig, blijft naar boven gaan'); // DOWN when UP verboden in setDirection (Controller)
    
    var snake = createStartSnake();
    var snake_up = createStartSnake();
    prepareSnake( snake_up, 20,0,20,0, LEFT ); 
    snake.setDirection(LEFT);
    snake.doMove();
    assert.propEqual(snake,snake_up,'Opwaarts gerichte slang, naar links');

    var snake = createStartSnake();
    var snake_up = createStartSnake();
    prepareSnake( snake_up, 0,20,-20,0, RIGHT );
    snake.setDirection(RIGHT);
    snake.doMove();
    assert.propEqual(snake,snake_up,'Opwaarts gerichte slang, naar rechts');

});

QUnit.test('runInto' , function (assert) {
    
    expect(2);

    nieuwSpeelveld(100,200);
    
    var snake = createStartSnake();
    var segments = snake.getSegments();
    segments.unshift( createSegment(60,90) );
    snake.setSegments(segments);
    snake.setDirection( RIGHT );
    assert.ok(snake.runInto(),'Slang loopt tegen zichzelf aan');
 
    nieuwSpeelveld(100,200);
    
    var snake = createStartSnake();
    var segments = snake.getSegments();
    segments.unshift(createSegment(100,90));
    snake.setSegments(segments);
    snake.setDirection( RIGHT );

    assert.ok(!snake.runInto(),'Slang loopt niet tegen zichzelf aan');
});

QUnit.test('tryToEat (whitebox test, er wordt wat gegeten of niet)' , function (assert) {
    expect(10);

    nieuwSpeelveld(100,200);
    
    var snake = createStartSnake();
    var tail  = createSegment(100,90);
    var foods = [ createFood(30,30) ];
    var snackbar = createSnackbar( snake );
    snackbar.setFoods( foods );
    snake.tryToEat(snackbar,tail);
    assert.ok( (!snackbar.isEmpty() ),'Slang vindt brokje niet' );
    assert.ok(snake.getSegments().length === 2, 'Slang is niet langer geworden');

    var snake = createStartSnake();
    var tail  = createSegment(100,90);
    var foods = [ createFood(40,70) ];
    var snackbar = createSnackbar( snake );
    snackbar.setFoods( foods );
    snake.tryToEat(snackbar,tail);
    assert.ok((!snackbar.isEmpty()),'Slang vindt brokje niet');
    assert.ok(snake.getSegments().length === 2, 'Slang is niet langer geworden');

    var snake = createStartSnake();
    var tail  = createSegment(100,90);
    var foods = [ createFood(45,80) ];
    var snackbar = createSnackbar( snake );
    snackbar.setFoods( foods );
    snake.tryToEat(snackbar,tail);
    assert.ok((snackbar.isEmpty()),'Brokje gegeten'); 
    assert.propEqual(snake.getSegments()[0], tail, 'Slang behoudt oud staart stuk');
    assert.ok(snake.getSegments().length === 3, 'Slang is langer geworden');
    

    var snake = createStartSnake();
    var tail  = createSegment(100,90);
    var foods = [ createFood(45,100) ];
    var snackbar = createSnackbar( snake );
    snackbar.setFoods( [ foods ] );
    snake.tryToEat(snackbar,tail);
    assert.ok(snackbar.isEmpty(),'Brokje gegeten');
    assert.propEqual(snake.getSegments()[0], tail, 'Slang behoudt oud staart stuk');
    assert.ok(snake.getSegments().length === 3, 'Slang is langer geworden');

});

QUnit.test('collidesWithOneOf', function (assert) {

    expect(6);

    var rij = [ createFood(10,10), createFood(35,35), createFood(35,45) ];
    var element = createFood(60,60);
    assert.ok(element.collidesWithOneOf(rij) === -1, 'Stukje voedsel met al het voedsel vergelijken: Geen botsing');

    var rij = [ createFood(10,10), createFood(35,35), createFood(35,45) ];
    var element = createFood(32,33);
    assert.ok(element.collidesWithOneOf(rij) === 1, 'Stukje voedsel met al het voedsel vergelijken: Juiste brokje gevonden');
    
    var rij = [ createSegment(10,10), createSegment(35,35), createSegment(35,45) ];
    var element = createFood(60,60);
    assert.ok(element.collidesWithOneOf(rij) === -1, 'Stukje voedsel met de hele slang vergelijken: Geen botsing');

    var rij = [ createSegment(10,10), createSegment(35,35), createSegment(35,45) ];
    var element = createFood(32,33);
    assert.ok(element.collidesWithOneOf(rij) === 1, 'Stukje voedsel met de hele slang vergelijken: Juiste brokje gevonden');


    var rij = [ createFood(10,10), createFood(35,35), createFood(35,45) ];
    var element = createSegment(60,60);
    assert.ok(element.collidesWithOneOf(rij) === -1, 'Slangekop met al het voedsel vergelijken: Geen botsing');

    var rij = [ createFood(10,10), createFood(35,35), createFood(35,45) ];
    var element = createSegment(32,33);
    assert.ok(element.collidesWithOneOf(rij) === 1, 'Slangekop met al het voedsel vergelijken: Juiste brokje gevonden');

});

QUnit.test('createFood' , function (assert) {
    expect(3);

    var testVoedsel = {  radius : R, x : 10, y : 40, color : FOOD };
    assert.propEqual(createFood(10,40),testVoedsel,'Voedsel definitie komt overeen');

    var testVoedsel = {  radius : R, x : 15, y : 40, color : FOOD };
    assert.notPropEqual(createFood(10,40),testVoedsel, 'Voedsel definitie wijkt af op basis x parameter');

    var testVoedsel = { radius : R, x : 10, y : 45, color : FOOD };
    assert.notPropEqual(createFood(10,40),testVoedsel, 'Voedsel definitie wijkt af op basis y parameter');

});

QUnit.test('createSegment' , function (assert) {
    expect(3);

    var testSegment = {  radius : R, x : 10, y : 40, color : SNAKE };
    assert.propEqual(createSegment(10,40),testSegment,'Slangsegment definitie komt overeen');

    var testSegment = {  radius : R, x : 15, y : 40, color : FOOD };
    assert.notPropEqual(createSegment(10,40),testSegment, 'Slangsegment definitie wijkt af op basis x parameter');

    var testSegment = {  radius : R, x : 10, y : 45, color : FOOD };
    assert.notPropEqual(createSegment(10,40),testSegment, 'Slangsegment definitie wijkt af op basis y parameter');
});

QUnit.test('setDirection' , function (assert) {
    expect(16);

    nieuwSpeelveld(100,200);
    var speelveld = getSpeelveld();
    
    var snake = createStartSnake();
    snake.setDirection( UP );
    assert.ok( ( snake.getDirection() === UP ), 'UP -> UP' );

    var snake = createStartSnake();
    snake.setDirection( DOWN );
    assert.ok( ( snake.getDirection() === UP ), 'UP -> DOWN' );

    var snake = createStartSnake();
    snake.setDirection( LEFT );
    assert.ok( ( snake.getDirection() === LEFT ), 'UP -> LEFT' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT );
    assert.ok( ( snake.getDirection() === RIGHT ), 'UP -> RIGHT' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT );
    snake.setDirection( DOWN );
    snake.setDirection( DOWN );
    assert.ok( ( snake.getDirection() === DOWN ), 'DOWN -> DOWN' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT );
    snake.setDirection(DOWN); 
    snake.setDirection( UP );
    assert.ok( ( snake.getDirection() === DOWN ), 'DOWN -> UP' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT );
    snake.setDirection( DOWN ); 
    snake.setDirection( LEFT );
    assert.ok( ( snake.getDirection() === LEFT ), 'DOWN -> LEFT' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT );
    snake.setDirection( DOWN ); 
    snake.setDirection( RIGHT );
    assert.ok( ( snake.getDirection() === RIGHT ), 'DOWN -> RIGHT' );
    
    var snake = createStartSnake();
    snake.setDirection(LEFT); 
    snake.setDirection( LEFT );
    assert.ok( ( snake.getDirection() === LEFT ), 'LEFT -> LEFT' );

    var snake = createStartSnake();
    snake.setDirection(LEFT); 
    snake.setDirection( RIGHT );
    assert.ok( ( snake.getDirection() === LEFT ), 'LEFT -> RIGHT' );

    var snake = createStartSnake();
    snake.setDirection(LEFT); 
    snake.setDirection( UP );
    assert.ok( ( snake.getDirection() === UP ), 'LEFT -> UP' );

    var snake = createStartSnake();
    snake.setDirection( LEFT ); 
    snake.setDirection( DOWN );
    assert.ok( ( snake.getDirection() === DOWN ), 'LEFT -> DOWN' );
    
    var snake = createStartSnake();
    snake.setDirection( RIGHT ); 
    snake.setDirection( LEFT );
    assert.ok( ( snake.getDirection() === RIGHT ), 'RIGHT -> LEFT');

    var snake = createStartSnake();
    snake.setDirection( RIGHT ); 
    snake.setDirection( RIGHT );
    assert.ok( ( snake.getDirection() === RIGHT ), 'RIGHT -> RIGHT' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT ); 
    snake.setDirection( UP );
    assert.ok( ( snake.getDirection() === UP ), 'RIGHT -> UP' );

    var snake = createStartSnake();
    snake.setDirection( RIGHT ); 
    snake.setDirection( DOWN );
    assert.ok( ( snake.getDirection() === DOWN ), 'RIGHT -> DOWN' );
    
});

QUnit.test('createFoods' , function (assert) { // Beperkt testbaar ivm gebruik constante en random functie
    expect(1);

    nieuwSpeelveld(100,200);
    var snake = createStartSnake();

    assert.ok( ( createFoods(snake).length === NUMFOODS ), 'Whitebox - createfoods produceert juiste aantal hapjes' );

});

QUnit.test('createRandomInt' , function (assert) { // Beperkt testbaar, onmogelijk om een 'fout' te genereren

    expect(3);

    assert.ok( ( getRandomInt(1,10)  >=  1 ), 'Zakt niet door ondergrens' );
    assert.ok( ( getRandomInt(1,10)  <= 19 ), 'Overstijgt bovengrens niet' );
    assert.ok( ( getRandomInt(7,7)  ===  7 ), 'Genereert het juiste getal')

});


