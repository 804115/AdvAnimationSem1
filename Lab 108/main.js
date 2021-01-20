var game; // a single global object

window.onload = init;//  After the window has been loaded, go to init

function init(){
    let movers = loadMovers(30);
    let vehicle = new Vehicle();
    let boid = new Boid();
    game = new Game();// global game
    animate();          // kick off the animation
}

//  animation loop called 60 fps
function animate(){
  game.ps.addParticle();
  game.run();    // run the game
  requestAnimationFrame(animate);
  }
  //   create the array of mover objects
function loadMovers(numMovers){
    var movers = [];
    for(var i = 0; i < numMovers; i++){
      var x, y, dx, dy, diam, clr, r, g, b;
      x = Math.random()*900;
      y = Math.random()*700;
      dx = Math.random()*6-3;
      dy = Math.random()*6-3;
      diam = 15;//Math.random()*20 + 10;
      r = 255;
      g = 255;
      b = 255;
      clr = "rgba(" + r + ", "+ g + ","+ b +")"
      movers[i] = new Mover(x, y, dx, dy, diam, clr);
    }
    return movers;
}
