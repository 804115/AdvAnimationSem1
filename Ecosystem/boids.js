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
    /*if(this !== game.boids[0]){
        let d = this.loc.distance(game.boids[0].loc);
        if(d < 50){
            this.acc = JSVector.subGetNew(game.boids[0].loc, this.loc); // switch parameters
            this.acc.normalize();
            this.acc.multiply(0.05);
        }*/

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
}

Boid.prototype.render = function(){
    let ctx = game.ctx;

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
  }
