function Vehicle(x, y){
  this.loc = new JSVector(x, y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.maxSpeed == 10;
  this.maxForce == 10;
  this.scl = 10;
  this.clr = "rgba(150, 255, 235)";
}

Vehicle.prototype.run = function(){
  this.render();
  this.update();
  //this.checkEdges();
}

Vehicle.prototype.render = function(){
  let ctx = game.ctx;
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
}

Vehicle.prototype.update = function(){
  this.vel.add(this.acc);
  this.acc.multiply(0);
  this.vel.limit(2);
  this.loc.add(this.vel);
  this.flock(game.vehicles);
}

Vehicle.prototype.applyForce = function(v2){
  this.acc.add(v2);
}

Vehicle.prototype.flock = function(vehicles){
  var sep = this.separate(vehicles);
  //var align = this.align(vehicles);
  //var cohesion = this.cohesion(vehicles);

  sep.normalize();
  sep.multiply(1.5);
  //align.multiply(1.0);
  //cohesion.multiply(1.0);

  this.applyForce(sep);
  //applyForce(align);
  //applyForce(cohesion);
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
  return sep.normalize();
}


Vehicle.prototype.align = function(vehicles){
  var neighborDist = 50;
  var sum = new JSVector(0, 0);
  let count = 0;
  for(i = 0; i < vehicles.length; i++){
    var dist = new this.loc.distance(vehicles[i].loc);
    if((dist > 0) && (dist < neighborDist)){
      sum.add(vehicles[i].vel);
      count++;
    }
  }

  if(count > 0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);
    let steer = JSVector.subGetNew(sum, this.vel);
    steer.limit(this.maxForce);
  } else{
    return new JSVector(0, 0);
  }

}

Vehicle.prototype.cohesion = function(vehicles){
  return new JSVector(0, 0);
}
