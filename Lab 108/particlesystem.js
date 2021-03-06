function ParticleSystem(){
  this.particles = [];
  this.loc = new JSVector(300, 200);
  this.loc2 = new JSVector(800, 400);
}

ParticleSystem.prototype.run = function(){
  for(let i = this.particles.length - 1; i >= 0; i--){
    this.particles[i].run();
  if (this.particles[i].isDead) {
    this.particles.splice(i, 1);
    }
  }
}

ParticleSystem.prototype.addParticle = function(){
  var dx, dy, rad, clr;
  dx = (Math.random()*1)-0.5;
  dy = (Math.random()*1)-0.5;
  rad = 10;
  clr = 'rgba(30, 180, 240, .5)';
  this.particles.push(new Particle(this.loc.x, this.loc.y, dx, dy, rad, clr));
  this.particles.push(new Particle(this.loc2.x, this.loc2.y, dx, dy, rad, clr));
}
