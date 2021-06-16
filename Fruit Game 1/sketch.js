const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var woddenBoard;
var knife;
var fruits = [];
var bombs = [];
var score = 0;
var lifes = 0;
var knifeSound;
var BackSound;
var gameState = "play"; 
var gameover;

function preload(){
    woddenBoard = loadImage ("sprites/WoddenBoard.png");
    knifeSound = loadSound("sprites/Knife Friut Cut Sound.mp3");
    BackSound = loadSound("sprites/BACK.mp3");
    gameover = loadImage("sprites/Gameover.png");
}

function setup(){
    var canvas = createCanvas(1200,500);
    engine = Engine.create();
    world = engine.world;
    knife = new Knife (200,200,50,50);
    BackSound.loop()
    

}

function draw(){
    background(woddenBoard);
    stroke("black")
    fill("black")
    textSize(25)
    
    Engine.update(engine);
    if (lifes === 0){
        gameState = "end"
    }
    if(gameState === "play"){
        text("SCORE - "+score,1000,40)
        text("LIFES  - "+lifes,50,30)    
        knife.x = World.mouseX;
        knife.y = World.mouseY;
        knife.display(); 
        score = spawnFruits();
        lifes  = spawnBombs();
    }
   else if (gameState === "end"){
       image(gameover,550,200,250,250);
   } 
    
    
}


function spawnFruits(){
    if (frameCount%70 === 0){
        fruits.pop();
        var newFruit = new Fruits(Math.round(random(50,1150)),50);
        fruits.push(newFruit);
      
    }
    for (var j = 0; j < fruits.length; j++) {
        fruits[j].display(); 
        if(isTouching(knife,fruits[j])){
                knifeSound.play()
                score = score + 1;
                World.remove(fruits[j])
                fruits.splice(j,1);
        }
     } 
     return score;
}


function spawnBombs(){
   
    if (frameCount % 70 === 0){
        bombs.pop()
        bombs.push(new Bomb(Math.round(random(50,1150)),50));
    }
    for (var k = 0; k < bombs.length; k++) {
        bombs[k].display();  
        
        if(isTouching(knife,bombs[k])){
            lifes = lifes - 1;
            World.remove(bombs[k])
            bombs.splice(k,1);
        }
     }
     return lifes
}

function isTouching(movingRect,fixedRect){
if (movingRect.x - fixedRect.x < fixedRect.width/2 + movingRect.width/2 &&
    fixedRect.x - movingRect.x < fixedRect.width/2 + movingRect.width/2 &&
    movingRect.y - fixedRect.y < fixedRect.height/2 + movingRect.height/2 &&
    fixedRect.y - movingRect.y < fixedRect.height/2 + movingRect.height/2) 
    {return true} 
else 
    {return false}
}