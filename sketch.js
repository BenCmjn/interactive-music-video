let bg;
let ang1 = 0;
let ang2 = 0;
let ang3 = 0;
let t = 0;
let scalar = 60;
let font, fontsize;
//SEE https://www.youtube.com/watch?v=fdixQDPA2h0&list=RDjKW4s02ib7s&index=3
//HELP FOUND : http://www.dimension-k.com/maths/ISN/P5/intro-P5play.html
var spr;
var fishes;
var birds;
var direction = 90; //circle initial direction moving down
var decel ; // speed decelerate as sprite size is little (far away)


function preload() {
  bg = loadImage('assets/RedSkyFin-min.jpg');
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/calmejane.mp3');
}



function setup() {
  createCanvas(displayWidth, displayHeight);
  angleMode(DEGREES);
  stroke(100);
  strokeWeight(1);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  //image(img, x, y, [width], [height])

  fishes = new Group();
  birds = new Group();
  
}

function draw() {
  //DEFINE COLORS ---------------
  sea = color(10, 60, 240, 255 / 3);
  sky = color(200, 0, 0);
  sun = color(255, 160, 0);
  
  
  //DEFINE COS & SIN -------------
  let x1 = width / 2 + scalar * cos(ang1);
  let x2 = width / 2 + scalar * cos(ang2);
  let x3 = width / 2 + scalar * cos(ang3);
  let y1 = height / 2 + scalar * sin(ang1);
  let y2 = height / 2 + scalar * sin(ang2);
  let y3 = height / 2 + scalar * sin(ang3);

  //DRAW THE SKY -------------
  //background(sky);
  push();
  background(sky);
  imageMode(CENTER);
  translate(width/2,height/2);
  tint(255, 120); // Display at half opacity
  image(bg, 0, 0,width,height);
  noTint();
  pop();
  noStroke();

  //DRAW THE SUN -------------
  
  fill(sun);
  ellipse(width / 2, height / 2, scalar * 2, scalar * 2);
  
  //DRAW THE SEA -------------
  fill(sea);
  //------------------ CURVE 1  
  beginShape();
  vertex(-1, y1);
  quadraticVertex(width / 2, x1, width, y1, width, y2);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  //------------------ CURVE 2  
  beginShape();
  vertex(-1, y1);
  quadraticVertex(x1, y3, width, y1, width, y3);
  vertex(width, height);
  vertex(-1, height + 1);
  endShape(CLOSE);
  //------------------ CURVE 3  
  beginShape();
  vertex(-1, y1);
  quadraticVertex(0, y1 * 1.2, width, y1, width, y1 * 1.5);
  vertex(width, height);
  vertex(-1, height + 1);
  endShape(CLOSE);
  //------------------ CURVE 4  
  beginShape();
  vertex(-1, y1);
  quadraticVertex(x3, x3 * .8, width, y1, x3 * 10, y3);
  vertex(width, height);
  vertex(-1, height + 1);
  endShape(CLOSE);
  //------------------ WAVE LOOP
  // From https://p5js.org/examples/interaction-wavemaker.html
  let dropSize = 40;
  push();
  translate(0, 0);
  fill(255, 9);
  for (let x = 0; x <= width; x = x + dropSize / 2) {
    //for (let y = y1*1.1 + dropSize / 2; y <= height+y1; y = y + dropSize / 2) { // WITH ACCELERATION
      for (let y = height/2 + dropSize ; y <= height+y1; y = y + dropSize / 2) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * x + yAngle * y;
      // each particle moves in a circle 
      const myX = x + 20 * cos(2 * PI * (ang1/2) + angle);
      const myY = y + 20 * cos(2 * PI * (ang1/3) + angle);
      ellipse(myX, myY, dropSize * 2, dropSize / 2); // draw particle
      
    }
  }
  pop();
  //HIDE CURSOR ------------------
  noCursor();
  fill(sun);
  ellipse(mouseX,mouseY,4,4); // miniCursor
  triangle(mouseX-2, 0,mouseX+2, 0, mouseX, 8);
  triangle(0, mouseY-2,0,mouseY+4, 8,mouseY);

  
  //DRAW THE HELPS / TEXT -------------
  fill(0);
  //----------------------- X
  text('X1', x1, height / 2);
  text('X3*0.5', x3 * 0.4, height / 2);
  text('X3*1.5', x3 * 1.5, height / 2);
  text('X3', x3, height / 2);
  //----------------------- Y
  text('Y1', width / 2, y1);
  text('Y2', width / 2, y2);
  text('Y3', width / 2, y3);
  text('Y3*1.5', width / 2, y3*1.5);
  //----------------------- XY
  text('1', x1, y1);
  text('2', x2, y2);
  text('3', x3, y3);


  //ANIMATE --------------------------
  // --------------------- SPEED
  t += 0.01
  ang1 += 1;
  ang2 += 1.5;
  ang3 -= 1.2;
  
  //SPRITES FROM P5.PLAY---------------
  
  for (var i = 0; i < fishes.length; i++) {
    fishes[i].position.x -= fishes[i].width * 0.06;
    fishes[i].attractionPoint(random(3), 0, y3*1.5);

    fishes[i].maxSpeed = 3;
    if (fishes[i].position.x < 0) {
      fishes[i].remove();
    } 
  }

  for (var j = 0; j < birds.length; j++) {
    //birds[j].scale -= 0.003;
  //aside of setting the velocity directly you can move a sprite
  //by providing a speed and an angle
  direction = width;
  decel =  birds[j].scale * 10;
  //speed, angle    
  birds[j].setSpeed(decel, direction);
  birds[j].frameDelay = 1;
  //blublu.attractionPoint(2, width, height/2);
  if (birds[j].scale < 0) {
    birds[j].remove();
  } 
  }
  

/*
  //DRAW A ANIMATED SPRITE ---------
  blublu.scale -= 0.003;
  //aside of setting the velocity directly you can move a sprite
  //by providing a speed and an angle
  direction = width;
  //speed, angle    
  blublu.setSpeed(5, direction);
  blublu.frameDelay = 1;
  //blublu.attractionPoint(2, width, height/2);
  if (blublu.scale < 0) {
    blublu.remove();
  }

  */

  //----------------------Sprite creation
  drawSprites(); 
} ///////////////////////////////////////////// END OF DRAW /////////////
//DEFINE KEY EVENT ---------------
//------------------------------SOUND EVENTS
function keyPressed() {
  mySound.setVolume(0.4);
  if (key == 'p' || key == 'P'){
    mySound.pause();
    }
  if (key == 's' || key == 'S'){
      mySound.loop();
  }
  //------------------------------ANIM EVENTS
  if (key == 'g' || key == 'G'){
    var anim_gre = loadAnimation('assets/gre/gre00.png', 'assets/gre/gre08.png');
    gre = createSprite(-200,random(height/4,height-height/4), 50, 100);
    gre.addAnimation('flying', anim_gre);
    birds.add(gre);
    }
  if (key == 'y' || key == 'Y'){
    var anim_yel = loadAnimation('assets/yel/yel00.png', 'assets/yel/yel08.png');
    yel = createSprite(-200,random(height/4,height-height/4), 50, 100);
    yel.addAnimation('flying', anim_yel);
    birds.add(yel);
    }
}
//DEFINE MOUSE EVENT ---------------
function mousePressed() {
  var c = createSprite(width, random(height/2,height), 40, 40); // on indique sa position et ses dimensions
  c.shapeColor = color(255,random(50));
  fishes.add(c);

  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between
  var anim_blublu = loadAnimation('assets/blublu/blublu 000.png', 'assets/blublu/blublu 008.png');  
  var anim_red = loadAnimation('assets/red/red00.png', 'assets/red/red08.png');
  //create a sprite and associate an existing animation as visual component
  blublu = createSprite(-200,random(height/4,height-height/4), 50, 100);
  red = createSprite(-200,random(height/4,height-height/4), 50, 100);
  //since a sprite can have multiple images and animations
  //the first parameter must be a label identifying the animation
  blublu.addAnimation('flying', anim_blublu);
  red.addAnimation('flying', anim_red);

  blublu.scale = random(0.5,1);
  //Add this sprite to the group of birds
  birds.add(blublu);
  birds.add(red);
/*
  //spr.velocity.y = random(5);
  spr.velocity.x = random(-5,-3);
  spr.friction = 0;
  spr.life = -1;
  */
}
//DEFINE WINDOW EVENT ---------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}