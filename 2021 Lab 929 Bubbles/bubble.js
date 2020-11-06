//  Bubble constructor function +++++++++++++++++++++++++++++
function Bubble(x, y, dx, dy, diam, clr){
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(dx, dy);
    this.diam = diam;
    this.rad = this.diam;///2;
    this.clr = clr;
    this.isOverlapping = false;
}

  //  placing methods in the prototype (every ball shares functions)

  Bubble.prototype.run = function(){
    this.checkEdges();
    this.checkOverlapping()
    this.update();
    this.render();
  }

  Bubble.prototype.checkOverlapping = function(){
      this.isOverlapping = false;//  default color
      this.clr =  "rgba(255,255,255,255)"
    var b = game.bubbles;
    for(var i = 0; i < b.length; i++){
       if(this !== b[i]){
         //var d = Math.sqrt((this.loc.x-b[i].loc.x)*(this.loc.x-b[i].loc.x) + (this.loc.y-b[i].loc.y)*(this.loc.y-b[i].loc.y));
         var d = this.loc.distance(b[i].loc);
         if(d < this.rad + b[i].rad){
            this.isOverlapping = true;
            this.clr =  "rgba(190,22,255,10)"
         }
       }
    }

  }

  Bubble.prototype.render = function(){
    if(this.isOverlapping){
        ctx.strokeStyle = "rgba(255,255,255,255)"//this.clr;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.loc.x,this.loc.y, this.diam, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();
    }else{
        ctx.strokeStyle = this.clr;
        //ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.loc.x,this.loc.y, this.diam, Math.PI*2, 0, false);
        ctx.stroke();
        //ctx.fill();
    }

  }

  Bubble.prototype.update = function(){
    if(!game.gamePaused){
      this.vel.x = Math.random()*6-3;
      this.vel.y = Math.random()*6-3;
      this.loc.add(this.vel);
    }
  }

  Bubble.prototype.checkEdges = function(){
    if(this.loc.x > canvas.width)  this.loc.x = 0;
    if(this.loc.x < 0)  this.loc.x = canvas.width;
    if(this.loc.y > canvas.height)  this.loc.y = 0;
    if(this.loc.y < 0)  this.loc.x = canvas.height;
  }
