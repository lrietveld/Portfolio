function Question(q, number, pic){
  this.ques = q;
  this.n = number;
  this.pic = pic;
}
Question.prototype.getN = function(){
 return this.n; 
}
Question.prototype.compareTo = function(other){
    if(this.getN()>other.getN()){
     return 1; 
    }
    
    else if(this.getN()<other.getN()){
     return -1; 
    }
    
    else {
      
     return 0; 
    }
    
  }
Question.prototype.toString = function(){
    return this.ques;
}
Question.prototype.getPhoto = function(){
    return this.pic;
}