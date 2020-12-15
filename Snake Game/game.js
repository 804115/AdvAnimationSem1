function Game(){
  this.gamePaused = false;
  this.ga = new GameArea();
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.snakes = [];
  this.createSnakes(this.canvas, 40);

}


  Game.prototype.run = function(){
    if (!this.gamePaused){
      for(let i = 0; i < this.snakes.length; i++){
        this.snakes[i].run();
      }
    }
}

  // create the movers
  Game.prototype.createSnakes = function(canvas, numMovers){
    for(let i = 0; i < numMovers; i++){
      var x, y, dx, dy, rad, clr, r, g, b;
      //, numOrbs;
      rad = 6;
      x = Math.random()*this.canvas.width;
      y = Math.random()*this.canvas.height;
      dx = Math.random()*2-1;
      dy = Math.random()*2-1;
      //diam = 15;
      r = Math.random()* 200*55;
      g = Math.random()* 155;
      b = Math.random()* 155;
      clr = "rgba(" + r + ", " + g + "," + b + ")";
      //numOrbs = Math.floor(Math.random()* 10) + 3;
      this.snakes.push(new Snake(x, y, dx, dy, rad, clr, 6));
    }
    return this.snakes;
  }
