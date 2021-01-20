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
  for(let i = 0; i < game.boids.length; i++){
    if(this !== game.boids[i]){
        let d = this.loc.distance(game.boids[i].loc);
        if(d < 50){
            this.acc = JSVector.subGetNew(this.loc, game.boids[i].loc); // switch parameters
            this.acc.normalize();
            this.acc.multiply(0.05);
          }
        }
  }

    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);
    this.segments[0] = this.loc;
    for(let i = 1; i < this.segments.length; i++){
        let diff = JSVector.subGetNew(this.segments[i], this.segments[i-1]);
        diff.setMagnitude(this.seg);
        this.segments[i] = JSVector.addGetNew(this.segments[i-1], diff);
    }
}


Snake.prototype.checkEdges = function(){
  let world = game.world;
  if (this.loc.x >= world.right) {
    this.vel.x = -this.vel.x;
  } else if (this.loc.x <= world.left) {
    this.vel.x = -this.vel.x;
  }

  if (this.loc.y >= world.bottom) {
    this.vel.y = -this.vel.y;
  } else if (this.loc.y <= world.top) {
    this.vel.y = -this.vel.y;
  }
}


Snake.prototype.render = function(){
  let ctx = game.context1;
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

    let ctx2 = game.context2;
      ctx2.strokeStyle = 'rgba(238, 18, 108, .5)';
      ctx2.fillStyle = 'rgba(238, 18, 108, .5)';
      for(let i = 1; i < this.segments.length; i++) {
          ctx2.lineCap = 'round';
          ctx2.lineWidth = this.segments.length-i;
          ctx2.beginPath();
          ctx2.moveTo(this.segments[i].x, this.segments[i].y);
          ctx2.lineTo(this.segments[i-1].x, this.segments[i-1].y);
          ctx2.stroke();
      }
  }
