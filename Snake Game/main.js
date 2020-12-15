var game;
window.onload = init;

function init(){
  game = new Game();

  animate();
}

function animate(){
  if(!game.gamePaused){

  game.ctx.fillStyle = 'rgba(0, 0, 0.15)';//black 'rgba(0, 0, 0, .75)'
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
 }
  game.run();
  requestAnimationFrame(animate);
}

function loadMovers(numMovers){
    var movers = [];
    for(var i = 0; i < numMovers; i++){
      var x, y, dx, dy, diam, clr, r, g, b;
      x = Math.random()*900;
      y = Math.random()*700;
      dx = Math.random()*6-3;
      dy = Math.random()*6-3;
      diam = 15;
      r = 255;
      g = 255;
      b = 255;
      clr = "rgba(" + r + ", "+ g + ","+ b +")"
      movers[i] = new Snake(x, y, dx, dy, diam, clr);
    }
    return movers;
}
