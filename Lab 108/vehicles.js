function Vehicle(x, y){
  this.loc = new JSVector(x, y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.maxSpeed = 2;
  this.maxForce = 2;
  this.scl = 10;
  this.clr = "rgba(150, 255, 235)";
}

Vehicle.prototype.run = function(vehicles){
  this.flock(vehicles);
  this.render();
  this.update();
  this.checkEdges();
}

Vehicle.prototype.render = function(){
  let ctx = game.context1;
  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection()+ Math.PI/2);
  ctx.beginPath();
  ctx.strokeStyle = "rgba(150, 255, 235)";
  ctx.fillStyle = "rgba(150, 255, 235)";
  ctx.moveTo(0,-this.scl);
  ctx.lineTo(-this.scl, this.scl);
  ctx.lineTo(0, 0);
  ctx.lineTo(this.scl, this.scl);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  let ctx2 = game.context2;
  ctx2.save();
  ctx2.translate(this.loc.x, this.loc.y);
  ctx2.rotate(this.vel.getDirection()+ Math.PI/2);
  ctx2.beginPath();
  ctx2.strokeStyle = "rgba(150, 255, 235)";
  ctx2.fillStyle = "rgba(150, 255, 235)";
  ctx2.moveTo(0,-this.scl);
  ctx2.lineTo(-this.scl, this.scl);
  ctx2.lineTo(0, 0);
  ctx2.lineTo(this.scl, this.scl);
  ctx2.closePath();
  ctx2.stroke();
  ctx2.fill();
  ctx2.restore();
}

Vehicle.prototype.update = function(){
  this.acc.limit(this.maxForce);
  this.vel.add(this.acc);
  this.acc.multiply(0);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
}

Vehicle.prototype.checkEdges = function(){
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

Vehicle.prototype.applyForce = function(v2){
  this.acc.add(v2);
}

Vehicle.prototype.flock = function(vehicles){
  var sep = this.separate(vehicles);
  var align = this.align(vehicles);
  //var cohesion = this.cohesion(vehicles);

  var sepMult = 0.05;
  var aliMult = 0.05;
  //var cohMult = game.slider5.value;
  sep.multiply(sepMult);
  align.multiply(aliMult);
  //cohesion.multiply(cohMult);

  this.applyForce(sep);
  this.applyForce(align);
  //this.applyForce(cohesion);
}

Vehicle.prototype.separate = function(vehicles){
  let desiredSeparation = 25;
  let sep = new JSVector(0, 0);
  for(i = 0; i < vehicles.length; i++){
    if(this != vehicles[i]){
    let dist = this.loc.distance(vehicles[i].loc);
    if(dist < desiredSeparation){
        let diff = new JSVector.subGetNew(this.loc, vehicles[i].loc);
        diff.normalize();
        sep.add(diff);
      }
    }
  }
  return sep;
}


Vehicle.prototype.align = function(vehicles){
  var neighborDist = 50;
  var sum = new JSVector(0, 0);
  let count = 0;
  for(var i = 0; i < vehicles.length; i++){
    var dist = this.loc.distance(vehicles[i].loc);
    if((dist > 0) && (dist < neighborDist)){
      sum.add(vehicles[i].vel);
      count++;
    }
  }

  if(count > 0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);
    let steer = new JSVector.subGetNew(sum, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return new JSVector(0, 0);
  }

}

Vehicle.prototype.cohesion = function(vehicles){
  var neighborDist = 50;
  var sum = new JSVector(0, 0);
  let count = 0;
  for(var i = 0; i < vehicles.length; i++){
    var distance = this.loc.distance(vehicles[i].loc);
    if((dist > 0) && (dist < neighborDist)){
      sum.add(vehicles[i].loc);
      count++;
    }
  }

  if(count > 0){
    sum.divide(count);
    return seek(sum);
  } else{
    return new JSVector(0, 0);
  }
}
