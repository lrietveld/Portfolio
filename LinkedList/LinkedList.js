var cat;
var lion;
var tiger;
var bear;
var cats;
var cheetah;
var w = 200;
var x = 0;

function preload() {
  cat = loadImage("data/our-cat-shop-image.png");
  lion = loadImage("data/imgres.jpg");
  tiger = loadImage("data/siberian-tiger-profile.jpg");
  bear = loadImage("data/bears1.jpg");
  cheetah = loadImage("data/cheetah.jpg");
}

function setup() {
createCanvas(800, 800);
cats = new LList();

cats.insert(cat, "head");
cats.insert(lion, cat);
cats.insert(bear, lion);
cats.insert(tiger, bear);

//cats.removeL(bear);
cats.display();
fill(240, 140, 30);
rect(0,200,200,200);
fill(0);
textSize(16);
text("Click to remove the noncat", 0, 300);

}

function draw() {
  //image(cat, 0, 0);
  //cats.display();
  
}
function mouseClicked(){
  if(mouseX>=(0)&&mouseX<=(200)&&mouseY>=200&&mouseY<400){
  cats.removeL(bear);
  createCanvas(800, 800);
  cats.display();
  fill(240, 140, 30);
  rect(200,200,200,200);
  fill(0);
  textSize(16);
  text("Click to add a cat", 200, 300);
  //}
  //if(mouseX>=(2*w)&&mouseX<=(3*w)){
  //cats.removeL(bear);
  //createCanvas(800, 800);
  //cats.display();
  } else if(mouseX>200&&mouseX<400&&mouseY>200&&mouseY<400){
  cats.insert(cheetah, tiger);
  createCanvas(800, 800);
  cats.display();
  }
  
  
}
function Node(element) {
 this.element = element;
 this.next = null;
}

function LList() {
 this.head = new Node("head");
 this.find = find;
 this.insert = insert;
 this.display = display;
 this.findPrevious = findPrevious;
 this.removeL = removeL;
 //image(cat);
}

function find(item) {
 var currNode = this.head;
 while (currNode.element != item) {
 currNode = currNode.next;
 }
 return currNode;
}

function insert(newElement, item) {
 var newNode = new Node(newElement);
 var current = this.find(item);
 newNode.next = current.next;
 current.next = newNode;
 
}

function display() {
 var currNode = this.head;
 //while (!(currNode.next === null)) {
 //print(currNode.next.element);
 //currNode = currNode.next;
 //}
 while (!(currNode.next === null)) {
 image(currNode.next.element, x, 0, w, 200);
 currNode = currNode.next;
 x+=200;
 }
 x = 0;
}

function findPrevious(item) {
 var currNode = this.head;
 while (!(currNode.next === null) &&
 (currNode.next.element != item)) {
 currNode = currNode.next;
 }
 return currNode;
}

function removeL(item) {
 var prevNode = this.findPrevious(item);
 if (!(prevNode.next == null)) {
 prevNode.next = prevNode.next.next;
 }
}