function Snake(x, y, dx, dy, rad, clr, n){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.rad = rad;
  this.clr = clr;
  this.seg = 5;
  this.segments = [];

  for(let i = 1; i < 12; i++){
    this.segments[i] = new JSVector(0, 0);
  }
}

Snake.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();
}


Snake.prototype.update = function(){
  let d = this.loc.distance(game.actors[0].loc);
  if(d < 200){
          this.acc = JSVector.subGetNew(game.actors[0].loc, this.loc); // switch parameters
          this.acc.normalize();
          this.acc.multiply(0.75);
  }
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.loc.add(this.vel);
    this.segments[0] = this.loc;
    for(let i = 1; i < this.segments.length; i++){
        let diff = JSVector.subGetNew(this.segments[i], this.segments[i-1]);
        diff.setMagnitude(this.seg);
        this.segments[i] = JSVector.addGetNew(this.segments[i-1], diff);
    }

    let dist = game.actors[0].loc.distance(this.loc);
    if (dist < 10){
      game.actors[0].vel.limit(0.001);
      game.actors[0].loc.add(game.actors[0].vel);
    }
  }



Snake.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.loc.x >= canvas.width) {
      this.vel.x = -this.vel.x;
    } else if (this.loc.x <= 0) {
      this.vel.x = -this.vel.x;
    }
    if (this.loc.y >= canvas.height) {
      this.vel.y = -this.vel.y;
    } else if (this.loc.y <= 0) {
      this.vel.y = -this.vel.y;
    }
}


Snake.prototype.render = function(){
  let ctx = game.ctx;
    ctx.strokeStyle = 'rgba(238, 18, 108, .5)';
    ctx.fillStyle = 'rgba(238, 18, 108, .5)';
    for(let i = 1; i < this.segments.length; i++) {
        ctx.lineCap = 'round';
        ctx.lineWidth = this.segments.length-i;
        ctx.beginPath();
        ctx.moveTo(this.segments[i].x, this.segments[i].y);
        ctx.lineTo(this.segments[i-1].x, this.segments[i-1].y);
        ctx.stroke();
    }
}
