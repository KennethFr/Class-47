var tree, treeImg;
var limb, RLimb, limbImg, RLimbImg;
var bird , birdImg, lGroup,rGroup;
var copper, copperImg;
var nest, nest2, nest3, nestImg;
var kenny, kennyImg;
var bg, bgImg;
var gameState=0

function preload(){
birdImg= loadAnimation("Images/Madbird.png","Images/FlappingBird.png",
"Images/Madbird.png","Images/FlappingBird.png")
  nestImg =loadImage("Images/Bird.png")
bgImg= loadImage("Images/Bg.png")
limbImg = loadImage("Images/Limb.png")
treeImg = loadImage("Images/Tree.png ")
copperImg = loadImage("Images/Cat.png")
RLimbImg = loadImage("Images/RLimb.png")
kennyImg = loadImage("images/Boy1.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  bg.addImage(bgImg)
  button=createButton('Start')
  button.position(displayWidth/2,displayHeight/2)
  bg.velocityY=2;
  tree = createSprite(displayWidth/2, displayHeight, 200, displayHeight*4);
  tree.addImage(treeImg)
  kenny = createSprite(displayWidth/2, displayHeight,50,200)
kenny.addImage(kennyImg)
kenny.debug=true
kenny.setCollider("rectangle",0,0,50,200)
kenny.scale=0.50

lGroup=new Group()
rGroup=new Group()
for(var i=0;i<=10;i++){
var lBranch=createSprite(displayWidth/2-200,displayHeight-(300*i),10,10)
lBranch.addImage(limbImg)
lGroup.add(lBranch)
kenny.collide(lBranch)
lBranch.debug=true
lBranch.setCollider("rectangle",0,-40,250,20)
}
for(var i=0;i<=10;i++){
  var rBranch=createSprite(displayWidth/2+200,displayHeight-(375*i),10,10)
  rBranch.addImage(RLimbImg)
  kenny.collide(rBranch)
rBranch.debug=true
rBranch.setCollider("rectangle",0,-40,250,20)
rGroup.add(rBranch)
  }
  bird=createSprite(100,100,10,10)
  bird.addAnimation("Flying",birdImg)
  bird.scale=0.10
  bird.visible='false'
  
    console.log(rGroup.get(4).y)
  copper=createSprite(displayWidth/2+200,rGroup.get(7).y-75,10,10)
  copper.addImage(copperImg)
  copper.scale=0.25

  nest=createSprite(displayWidth/2-200,lGroup.get(3).y-75,10,10)
  nest.addImage(nestImg)
  nest.scale=0.25

  nest2=createSprite(displayWidth/2-200,lGroup.get(5).y-75,10,10)
  nest2.addImage(nestImg)
  nest2.scale=0.25

  nest3=createSprite(displayWidth/2-200,rGroup.get(6).y-75,10,10)
  nest3.addImage(nestImg)
  nest3.scale=0.25
}

function draw() {
  background(255,255,255);
  if (gameState ===0){
    background('black')
    text('Welcome',displayHeight/2,displayWidth/2)
    button.mousePressed(()=>{
      gameState=1
      button.hide()
    })
  }
  if (gameState===1){
  if(bg.y>displayHeight-300){
    bg.y=displayHeight/2;
  }  
  if (keyDown (UP_ARROW)){
    kenny.velocityY=-10
    tree.velocityY=0.5
    lGroup.setVelocityYEach(2)
    rGroup.setVelocityYEach(2)
    copper.velocityY=2
    nest.velocityY=2
    nest2.velocityY=2
    nest3.velocityY=2
  }
  copper.collide(rGroup.get(4))
  nest.collide(lGroup.get(3))
  kenny.velocityY+=0.5
  if (keyDown (LEFT_ARROW)){
    kenny.velocityX=-2
  }
  if (keyDown (RIGHT_ARROW)){
    kenny.velocityX=2
  }
  for(var i=0;i<rGroup.length;i++){
    kenny.collide(lGroup.get(i))
    kenny.collide(rGroup.get(i))
  }
if (kenny.isTouching(nest)||
kenny.isTouching(nest2)||
kenny.isTouching(nest3)){

bird.x=nest.x
bird.y=nest.y
 bird.visible='true'   
}
  drawSprites();
}
}