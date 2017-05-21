//Laura Rietveld
var system;
var centerX;
var centerY;
var centerZ;
var k = 500;
var aX;
var aY;
var aZ;

function setup() {
  centerX = 0;
  centerY = 0;
  centerZ = 0;
  createCanvas(800, 600, WEBGL);
  
  system = new ParticleSystem(createVector(int(random(-10,10)), int(random(-10,10)), int(random(-10, 10))));
  //system = new ParticleSystem(createVector(2, 200, 0));
  system.addParticle();
  
  
}

function draw() {
  background(19, 32, 1);
  orbitControl();
  translate(0, 0, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(30);
  pop();
  push();
  fill(252, 145, 110, 70)
  rotateY(PI/2);
  plane(400);
  pop();
  push();
  fill(190, 252, 26, 70);
  rotateX(PI/2);
  plane(400);
  pop();
  push();
  fill(93, 240, 252, 70);
  rotateZ(PI/2);
  plane(400);
  pop();
  
  system.run();
  
}

var Particle = function(position) {
  this.position = position.copy();
  this.acceleration = createVector(aX, aY, aZ);
  this.velocity = createVector(0, 0, 0);
  this.r = int(random(10,20));
  this.numCharge = int(random(1,3));
  this.charge = random() < .8;
  //this.r = 10;
  
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  aX = this.numCharge*(centerX-this.position.x)/(pow(dist(this.position.x, this.position.y, this.position.z, centerX, centerY, centerZ), 3)*this.r);
  aY = this.numCharge*(centerY-this.position.y)/(pow(dist(this.position.x, this.position.y, this.position.z, centerX, centerY, centerZ), 3)*this.r);
  aZ = this.numCharge*(centerZ-this.position.z)/(pow(dist(this.position.x, this.position.y, this.position.z, centerX, centerY, centerZ), 3)*this.r)
  if(this.charge === true){
  this.acceleration = createVector(k*aX, k*aY, k*aZ);
  } else {
  this.acceleration = createVector(-k*aX, -k*aY, -k*aZ);
  }
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  //translate(this.position.x, this.position.y, this.position.z);
  
};

// Method to display
Particle.prototype.display = function() {
  translate(this.position.x, this.position.y, this.position.z);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(this.r);
  pop();
};
// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (abs(centerX-this.position.x) <= 10 && abs(centerY-this.position.y) <= 10 && abs(centerZ-this.position.z) <=10) {
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
  this.particles.push(new Particle(createVector(random(width), random(height), random(200))));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      p.r = 0;
      system.addParticle();
      
    }
  }
};

//I would like to give credit to the p5 example "Particle System" 
//It taught me how to make acceleration vectors and objects in js
//https://p5js.org/examples/simulate-particle-system.html