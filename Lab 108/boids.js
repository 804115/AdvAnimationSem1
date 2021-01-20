function Boid(x, y){
  let dy = (Math.random() * 4) - 2;
  let dx = (Math.random() * 4) - 2;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.maxSpeed = 3;
  this.maxForce = 2;
  this.scale = 15;
}

Boid.prototype.run = function(){
    this.render();
    this.update();
    this.checkEdges();
}

Boid.prototype.checkEdges = function(){
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

Boid.prototype.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
}

Boid.prototype.render = function(){
    let ctx = game.context1;

    ctx.fillStyle = 'rgba(26, 255, 0, 0.5)';

    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection() + Math.PI /2);
    ctx.beginPath();
    ctx.moveTo(0, -this.scale);
    ctx.lineTo(-this.scale, this.scale);
    ctx.lineTo(this.scale, this.scale);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    let ctx2 = game.context2;

    ctx2.fillStyle = 'rgba(26, 255, 0, 0.5)';

    ctx2.save();
    ctx2.translate(this.loc.x, this.loc.y);
    ctx2.rotate(this.vel.getDirection() + Math.PI /2);
    ctx2.beginPath();
    ctx2.moveTo(0, -this.scale);
    ctx2.lineTo(-this.scale, this.scale);
    ctx2.lineTo(this.scale, this.scale);
    ctx2.closePath();
    ctx2.stroke();
    ctx2.fill();
    ctx2.restore();
  }
