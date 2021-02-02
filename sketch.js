var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invblock,invblockGroup;
var spookySound
var gameState = "play";


function preload()
{
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}


function setup()
{
  createCanvas(600,520);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("building",towerImg);
  tower.velocityY = 1.5;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invblockGroup=new Group();
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.35
}

function draw()
{
  background(0);
  
  if(gameState==="play")
  {
    
 
  if(tower.y>520)
    {
      tower.y=260;
    }
  
  if(keyDown("space"))
    {
      ghost.velocityY=-2.5;
    }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("left_arrow"))
    {
      ghost.x=ghost.x-3;
    }
   if(keyDown("right_arrow"))
    {
      ghost.x=ghost.x+3;
    }
  if (climberGroup.isTouching(ghost))
    {
      ghost.velocityY=0
    }
     
  
  if(invblockGroup.isTouching(ghost))
    {
      ghost.destroy();
      gameState="end";
    }
  
  
  spawnDoor();
  }
  if(gameState==="end")
    {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game_Over",230,250);
      doorGroup.destroyEach();
      tower.destroy();
      climberGroup.destroyEach();
      invblockGroup.destroyEach();
    }
  
  drawSprites();
}

function spawnDoor()
{
  if(frameCount% 240===0)
    {
      door = createSprite(200,50);
      door.velocityY= 1.5;
      door.addImage("doori",doorImg);
      door.x = Math.round(random(100,450));
      door.lifetime=300
      doorGroup.add(door);
      ghost.depth=door.depth
      ghost.depth=ghost.depth+1
      
      climber = createSprite(200,115);
      climber.velocityY= 1.5;
      climber.addImage("climberi",climberImg);
      climber.lifetime=300;
      climber.x=door.x;
      climberGroup.add(climber);
      
      invblock = createSprite(200,130);
      invblock.width=climber.width;
      invblock.height=2
      invblock.x=door.x;
      invblock.velocityY = 1.5;
      invblock.lifetime=300;
      invblockGroup.add(invblock);
      invblock.debug=true;
      
    }
}