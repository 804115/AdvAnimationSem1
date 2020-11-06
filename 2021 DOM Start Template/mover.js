function Mover(x, y, dx, dy, rad, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.attract = new JSVector(0, 0);
  this.repulse = new JSVector (0, 0);
  this.rad = rad;
  this.clr = clr;
  this.isOverlapping = false;
}

Mover.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();
}

Mover.prototype.render = function(){
  let ctx = game.ctx;
  let b = game.movers;

    if(this == b[0]){
      ctx.strokeStyle = "rgba(154, 18, 179, 1)";
      ctx.fillStyle = "rgba(154, 18, 179, 1)";
    }
    else if(this == b[1]){
      ctx.strokeStyle = "rgba(0, 181, 204, 1)";
      ctx.fillStyle = "rgba(0, 181, 204, 1)";
    }
    else{
      ctx.strokeStyle = "rgba(255, 255, 255, 255)";
      ctx.fillStyle = this.clr;
    }
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.rad, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
}

Mover.prototype.update = function(){
  let b=game.movers;
  if(this !== b[0]){
    let d = this.location.distance(b[0].location);
    if(d<200){
      this.repulse = JSVector.subGetNew(this.location, b[0].location);
      this.repulse.normalize();
      this.repulse.multiply(0.5);
    }
  }
  if(this !== b[1]){
    let d = this.location.distance(b[1].location);
    if (d<200){
      this.attract = JSVector.subGetNew(b[1].location, this.location);
      this.attract.normalize();
      this.attract.multiply(0.5);

    }
  }
  if(!game.gamePaused){
    this.velocity.add(this.attract);
    this.velocity.add(this.repulse);
    this.velocity.limit(10);
    this.location.add(this.velocity);
  }
}

Mover.prototype.checkOverlapping = function(){
    this.isOverlapping = false;//  default color
    this.clr =  "rgba(255,255,255,255)"
    let b = game.bubbles;
    for(let i = 0; i < b.length; i++){ // for all the bubbles
       if(this !== b[i]){   // if not this bubble
         let d = Math.sqrt((this.x-b[i].x)*(this.x-b[i].x) + (this.y-b[i].y)*(this.y-b[i].y));
         if(d < this.rad + b[i].rad){
            this.isOverlapping = true;
            this.clr =  "rgba(100,220,55,10)"
         }
       }
    }

  }

Mover.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.x > canvas.width)  this.x = 0; // wrap around from right to left
    if(this.x < 0)  this.x = canvas.width; // wrap around from left to right
    if(this.y > canvas.height)  this.y = 0; // wrap around from bottom to top
    if(this.y < 0)  this.y = canvas.height; // wrap around from top to bottom
  }
