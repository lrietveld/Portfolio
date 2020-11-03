//Laura Rietveld
//5-11-17

var c;
var question;
var gen;
var que; 
var quesTree;
var display;
var yes;
var no;
var clears;
var x;


function preload(){
  yes = loadImage("data/yes.png");
  no = loadImage("data/no.png");
  clears = loadImage("data/up.png");
}
function setup() {
c = 600;
x = 100;
createCanvas(c, c);

  var qs = [new Question("Do you have blonde hair?", 4, loadImage("data/blond.jpg")), 
  new Question("Are you a senior?", 2, loadImage("data/senior.jpg")), 
  new Question("Are you a senior?", 10, loadImage("data/senior.jpg")),  
  new Question("Are you Anna Peterson?", 1, loadImage("data/annaP.jpg")), 
  new Question("Are you Brea?", 3, loadImage("data/brea.jpg")),
  new Question("Are you in band?", 8, loadImage("data/band.jpg")), 
  new Question("Connor?", 9, loadImage("data/connor.jpg")), 
  new Question("Are you Kaitlin?", 11, loadImage("data/kaitlin.jpg")), 
  new Question("Are you even in this class?", 6, loadImage("data/computers.jpg")),
  new Question("Is your name Izzy?", 7, loadImage("data/izzy.jpg")), 
  new Question("Is your name Anna Wise?", 5, loadImage("data/annaW.jpg"))];
  quesTree = new BST();
  for(var i = 0; i<qs.length; i++){
  //text(qs[i].compareTo(qs[i+1]), 100, 100+3*i);
  quesTree.insert(qs[i]); 
  }
  que = quesTree.root;
}

function draw() {
  background(que.show().getPhoto());
  textAlign(CENTER);
  textSize(32);
  display = que.show().toString();
  fill(255, 150);
  noStroke();
  rect(c/2-textWidth(display)/2, c/4-32, textWidth(display), 35);
  fill(0);
  text(display, c/2, c/4);
  tint(255, 128);
  image(no, c/2+x, 3*c/4, x, x);
  image(yes, c/2-2*x, 3*c/4, x, x);
  image(clears, c/2-x/2, 3*c/4-x, x, x);
  fill(0);
  text("yes", c/2-2*x+x/2, 3*c/4+x/2);
  text("no", c/2+x+x/2, 3*c/4+x/2);
  text("reset", c/2, 3*c/4-x/2);
  //quesTree.preOrder(quesTree.root);
  
  //system.run();
  
}
function keyPressed(){
 if(keyCode == RIGHT_ARROW){
   //console.log(quesTree.rightNode());
  //text("RightO", 400, 100);
  que = quesTree.rightNode(que);
  
 } else if (keyCode == LEFT_ARROW){
   que = quesTree.leftNode(que);
   
 } else if (keyCode == UP_ARROW){
   que = quesTree.root;
 }
  
}

var Button = function(name, xP, yP, wid, hei){
  this.name = name;
  this.xPos = xP;
  this.yPos = yP;
  this.xMax = xP + wid;
  this.yMax = yP+hei;
  this.wid = wid;
  this.hei = hei;
};

Button.prototype.run = function(){
 
 this.display();
 this.update();
 this.isClicked();
 
};

Button.prototype.display = function(){
  fill(57, 120, 22);
  rect(this.xPos, this.yPos, this.wid, this.hei);
  fill(255);
  textSize(16);
  text(this.name, this.xPos, this.yPos, this.wid, this.hei); 
};

Button.prototype.isClicked = function(){  

  if(mouseX>this.xPos && mouseX<this.xMax && mouseY>this.yPos && mouseY<this.yMax){
    text("isClicked", 100, 100);  
    return true;
    } else {
    
   return false;
  }
  
};


Button.prototype.move = function(){
  
  if((this.name).equalsIgnoreCase("No")){
    text("no, it's working", 100, 100);
  } else if((this.name).equalsIgnoreCase("yes")){
    text("yes, it's working", 100, 100);
  } else if((this.name).equalsIgnoreCase("Are you assuming my gender?")){
    text("yes, it's working", 100, 100);
  }
  //question =

};

var ButtonSystem = function(name, xP, yP, wid, hei){
  //this.origin = new Button(name, xP, yP, wid, hei);
  this.buttons = [];
};

ButtonSystem.prototype.addButton = function(name, xP, yP, wid, hei) {
  this.buttons.push(new Button(name, xP, yP, wid, hei));
};

ButtonSystem.prototype.run = function() {
  for (var i = this.buttons.length-1; i >= 0; i--) {
    var b = this.buttons[i];
    b.run();
    if (b.isClicked()) {
      b.move();
      
    }
  }
};


  
