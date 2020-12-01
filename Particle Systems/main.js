var game;
window.onload = init;

function init(){
  game = new Game();
  animate();
}

function animate(){
  game.ps.addParticle();
  game.ctx.fillStyle = 'rgba(0, 0, 0.15)';
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  game.run();
  requestAnimationFrame(animate);
}
