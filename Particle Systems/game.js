function Game(){
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.ps = new ParticleSystem();
}

Game.prototype.run = function(){
  this.ps.run();
}
