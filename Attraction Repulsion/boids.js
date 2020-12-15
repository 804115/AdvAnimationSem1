function Boid(x, y){
  let dy = (Math.random() * 4) - 2;
  let dx = (Math.random() * 4) - 2;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.scale = 9;




}

Boid.prototype.run = function(){
    this.render();
    this.update();
    this.checkEdges();

}



Boid.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.loc.x >= canvas.width) {
        this.loc.x = 0;
    } else if (this.loc.x <= 0) {
        this.loc.x = canvas.width;
    }
    if (this.loc.y >= canvas.height) {
        this.loc.y = 0;
    } else if (this.loc.y <= 0) {
        this.loc.y = canvas.height;
    }

}

Boid.prototype.update = function(){
    if(this !== game.boids[0]){
        let d = this.loc.distance(game.boids[0].loc);
        if(d < 50){
            this.acc = JSVector.subGetNew(game.boids[0].loc, this.loc); // switch parameters
            this.acc.normalize();
            this.acc.multiply(0.05);
        }
    }
    this.vel.add(this.acc);
    this.vel.limit(game.slider2.value);//limiting velocity to max speed
    this.loc.add(this.vel);

}

Boid.prototype.render = function(){
    let ctx = game.ctx;
    if(this == game.boids[0]){
        ctx.fillStyle = 'rgba(255,180,255,0.5)';
    }
    else{
        ctx.fillStyle = 'rgb(0,0,255)';
    }
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection() + Math.PI /2);
    ctx.beginPath();
    // 'rgba(400, 180, 500, .5)' - pink
    ctx.moveTo(0, -this.scale);
    ctx.lineTo(-this.scale, this.scale);
    ctx.lineTo(0,0);
    ctx.lineTo(this.scale, this.scale);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
