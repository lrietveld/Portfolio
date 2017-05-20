//Laura Rietveld
var system;
var centerX;
var centerY;
var k = 200;
var aX;
var aY;

function setup() {
  centerX = 200;
  centerY = 200;
  createCanvas(400, 400);
  system = new ParticleSystem(createVector(random(width), random(height)));
  system.addParticle();
  
}

function draw() {
  background(88, 148, 252);
 
  if(int(millis())%10 === 0){
  system.addParticle();
  }
  
  system.run();
  fill(0);
  ellipse(centerX, centerY, 30, 30);
}

var Particle = function(position) {
  this.position = position.copy();
  this.acceleration = createVector(aX, aY);
  this.velocity = createVector(0, 0);
  this.r = random(10, 20);
  this.numCharge = int(random(1,5));
  this.colors = color(random(240, 270), random(130, 180), random(30, 60));
  this.charge = Math.random() < 0.8;
  //this.r = 10;
  
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  aX = this.numCharge*(centerX-this.position.x)/(pow(dist(this.position.x, this.position.y, centerX, centerY), 3)*this.r);
  aY = this.numCharge*(centerY-this.position.y)/(pow(dist(this.position.x, this.position.y, centerX, centerY), 3)*this.r);
  if(this.charge === true){
  this.acceleration = createVector(k*aX, k*aY);
  } else {
  this.acceleration = createVector(-k*aX, -k*aY);
  }
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  fill(this.colors);
  ellipse(this.position.x, this.position.y, this.r, this.r);
  fill(0);  
  textAlign(CENTER);
  textSize(10);
  if(this.charge === true){
  text(this.numCharge + "+", this.position.x-this.r/2, this.position.y-this.r/2, this.r, this.r);  
  } else {
  text(this.numCharge + "-", this.position.x-this.r/2, this.position.y-this.r/2, this.r, this.r);
  }
};
// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (abs(centerX-this.position.x) <= 10 && abs(centerY-this.position.y) <= 10) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(createVector(random(width), random(height))));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      p.r = 0;
      //p.location = createVector(random(width), random(height));
      
    }
  }
};

//I would like to give credit to the p5 example "Particle System" 
//It taught me how to make acceleration vectors and objects in js
//https://p5js.org/examples/simulate-particle-system.html