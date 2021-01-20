function Mover(x, y, dx, dy, radius, clr, numOrbs){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.radius = radius;
  this.orbitAngle = Math.random() * Math.PI;
  this.clr = clr;
  this.orbiters = [];
  this.lifeSpan = 1000;
  this.isDead = false;

  //create all orbiters
  for(let i =0; i<numOrbs; i++){
    let a = i*(Math.PI*2)/numOrbs + this.orbitAngle;
    let angleVel = numOrbs*0.01;
    this.orbiters.push(new Orbiter(this, 4, 25, a, angleVel, this.clr));

  }
}

Mover.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();

  //update and render orbiters
  for(let i = 0; i < this.orbiters.length; i++){
    let orb = this.orbiters[i];
    orb.update();
    orb.render();
  }
}

Mover.prototype.render = function(){
  let context1 = game.context1;
  let context2 = game.context2;

    context1.strokeStyle = "rgba(255, 255, 255, 255)";
    context1.fillStyle = this.clr;
    context1.beginPath();
    context1.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
    context1.stroke();
    context1.fill();

    context2.strokeStyle = "rgba(255, 255, 255, 255)";
    context2.fillStyle = this.clr;
    context2.beginPath();
    context2.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
    context2.stroke();
    context2.fill();
}

// Move in random direction
Mover.prototype.update = function(){
  this.velocity.add(this.acc);
  this.velocity.limit(3);
  this.location.add(this.velocity);
  this.lifeSpan--;
  if(this.lifeSpan === 0){
    this.isDead = true;
  }
  for(let i = 0; i < game.movers.length; i++){
    let d = this.location.distance(game.movers[i].location);
    if(d > 0 && d < 2.45){
      game.createMover(game.world);
    }
  }
}

Mover.prototype.checkEdges = function(){
  let world = game.world;
  if (this.location.x >= world.right) {
    this.velocity.x = -this.velocity.x;
  } else if (this.location.x <= world.left) {
    this.velocity.x = -this.velocity.x;
  }

  if (this.location.y >= world.bottom) {
    this.velocity.y = -this.velocity.y;
  } else if (this.location.y <= world.top) {
    this.velocity.y = -this.velocity.y;
  }
}
