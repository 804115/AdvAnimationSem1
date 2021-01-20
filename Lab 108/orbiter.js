function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
  this.mover = mover;
  this.radius = orbiterRad;
  this.rotator = new JSVector(orbitRad, 0);
  this.rotator.setDirection(angle);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);
  this.angleVel = angleVel;
  this.clr = clr;
}

Orbiter.prototype.update = function(){
  this.rotator.rotate(this.angleVel);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);
}

Orbiter.prototype.render = function(){
  let ctx = game.context1;

  //draw orbiter
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
  ctx.stroke();
  ctx.fill();

  //draw line
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(this.mover.location.x, this.mover.location.y);
  ctx.lineTo(this.location.x, this.location.y);
  ctx.stroke();

  let ctx2 = game.context2;

  //draw orbiter
  ctx2.strokeStyle = this.clr;
  ctx2.fillStyle = this.clr;
  ctx2.lineWidth = 1;
  ctx2.beginPath();
  ctx2.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
  ctx2.stroke();
  ctx2.fill();

  //draw line
  ctx2.lineCap = "round";
  ctx2.lineWidth = 4;
  ctx2.beginPath();
  ctx2.moveTo(this.mover.location.x, this.mover.location.y);
  ctx2.lineTo(this.location.x, this.location.y);
  ctx2.stroke();
}
