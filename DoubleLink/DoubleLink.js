var dog;
var wolf;
var coyote;
var leopard;
var nul;
var arrow;
var header;
var left;

var y = 0;
var x = 0;
var h = 100;
var w = 100;

function preload(){
  dog = loadImage("data/dog-medium-landing-hero.jpg");
  wolf = loadImage("data/imgres-1.jpg");
  coyote = loadImage("data/images.jpg");
  leopard = loadImage("data/imgres-2.jpg");
  arrow = loadImage("data/arr.png");
  header = loadImage("data/Header.png");
  nul = loadImage("data/null.png");
   left= loadImage("data/left.png");
}
function setup() {
  createCanvas(900,900);
  var dogs = new LList();
dogs.insert(header, "head");
dogs.insert(dog, header);
dogs.insert(coyote, dog);
dogs.insert(leopard, coyote);
dogs.insert(wolf, leopard);
dogs.display();
//print();
dogs.removeL(leopard);
dogs.display();
//print();
dogs.dispReverse();

}

function draw() {

}

function Node(element) {
 this.element = element;
 this.next = null;
 this.previous = null;
}

function LList() {
 this.head = new Node("head");
 this.find = find;
 this.insert = insert;
 this.display = display;
 this.removeL = removeL;
 this.findLast = findLast;
 this.dispReverse = dispReverse;
}

function insert(newElement, item) {
 var newNode = new Node(newElement);
 var current = this.find(item);
 newNode.next = current.next;
 newNode.previous = current;
 current.next = newNode;
}

function removeL(item) {
 var currNode = this.find(item);
 if (!(currNode.next === null)) {
 currNode.previous.next = currNode.next;
 currNode.next.previous = currNode.previous;
 currNode.next = null;
 currNode.previous = null;
 }
}

function findLast() {
 var currNode = this.head;
 while (!(currNode.next === null)) {
 currNode = currNode.next;
 }
 return currNode;
}

function dispReverse() {
 var currNode = this.head;
 currNode = this.findLast();
 x = 0;
 image(nul, x, y, w, h);
 x += w;
 while (!(currNode.previous === null)) {
 h = (1/2)*h;
 image(left, x, y, (1/4)*w, h);
 h = w;
 x+=(1/4)*w;
 image(currNode.element, x, y, w, h);
 x += w;
 currNode = currNode.previous;

 }

 y+=2*h;
}

function display() {
 var currNode = this.head;
 x = 0;
 while (!(currNode.next === null)) {
 image(currNode.next.element, x, y, w, h);
 x+=w;
 h = (1/2)*h;
 image(arrow, x, y, (1/4)*w, h);
 currNode = currNode.next;
 x+=(1/4)*w;
 h = w;
 }
 if (currNode.next === null) {
 image(nul, x, y, w, h);
 }
 y+=2*h;
}

function find(item) {
 var currNode = this.head;
 while (currNode.element != item) {
 currNode = currNode.next;
 }
 return currNode;
}