function Mover(x, y, dx, dy, radius, clr, numSeg){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.radius = radius;
  this.numSeg = numSeg;
  this.noises = new Array(numSeg);
  for(let i = 0; i < numSeg; i++){
    this.noises[i] = Math.random();
  }
  //this.orbitAngle = Math.random() * Math.PI;
  this.clr = clr;
  //this.orbiters = [];

  // //create all orbiters
  // for(let i =0; i<numOrbs; i++){
  //   let a = i*(Math.PI*2)/numOrbs + this.orbitAngle;
  //   let angleVel = numOrbs*0.01;
  //   this.orbiters.push(new Orbiter(this, 4, 25, a, angleVel, this.clr));

  //}
}

Mover.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();

  //update and render orbiters
  // for(let i = 0; i < this.orbiters.length; i++){
  //   let orb = this.orbiters[i];
  //   orb.update();
  //   orb.render();
  // }
}

Mover.prototype.render = function(){
  let ctx = game.ctx;
  //let b = game.movers;


    ctx.strokeStyle = "rgba(255, 255, 255, 255)";
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    //snake head
    ctx.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);

    let segment = 20;


   // ctx.beginPath();
   let hypotenuse = Math.sqrt((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y));
   for(let i = 0; i < this.numSeg; i++) {
     let delta_x = - (i + 1) * segment * this.velocity.x / hypotenuse;
     let delta_y = - (i + 1) * segment * this.velocity.y / hypotenuse;
     ctx.arc(this.location.x+delta_x, this.location.y+delta_y, this.radius, Math.PI*2, 0, false);
   }

    ctx.stroke();
    ctx.fill();
}

// Move in random direction
Mover.prototype.update = function(){
  if(!game.gamePaused){
    this.velocity.add(this.acc);
    this.velocity.limit(3);
    this.location.add(this.velocity);
  }
}

Mover.prototype.checkEdges = function(){
  let canvas = game.canvas;

  if (this.location.x > canvas.width){
    this.location.x = 0;
  } else if (this.location.x < 0) {
    this.location.x = canvas.width;
  }

  if (this.location.y > canvas.height){
    this.location.y = 0;
  } else if (this.location.y < 0) {
    this.location.y = canvas.height;
  }
}
