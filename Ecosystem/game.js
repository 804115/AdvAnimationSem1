function Game(){
    game = this;
    let numVehicles = 20;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.movers = [];
    this.createMovers(this.canvas, 40);
    this.ps = new ParticleSystem();
    this.vehicles = [];

    // fill vehicles
    for(let i = 0; i < 20; i++){
      this.vehicles.push(new Vehicle(Math.random()*this.canvas.width, Math.random()*this.canvas.height));
    }

}

// function to run the game each animation cycle
Game.prototype.run = function(){
  // orbiters
  if(!this.gamePaused){
    for(let i = 0; i < this.movers.length; i++){
      this.movers[i].run();    // run each bubble
   }
  }

  // particle system
  this.ps.run();

  //run vehicles
  for(let i = 0; i < this.vehicles.length; i++){
    this.vehicles[i].run(this.vehicles);
  }
}

    Game.prototype.createMovers = function(canvas, numMovers){
      for(var i = 0; i < numMovers; i++){
        var x, y, dx, dy, radius, clr, r, g, b, numOrbs;
        radius = 7;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = Math.random()*2-1;
        dy = Math.random()*2-1;
        r = Math.random()*200*55;
        g = Math.random()*155;
        b = Math.random()*155;
        clr = "rgba("+ r +", "+ g +" , "+ b +")"
        numOrbs = Math.floor(Math.random() * 10) + 3;
        this.movers.push(new Mover(x, y, dx, dy, radius, clr, numOrbs));
      }
      return this.movers;
    }
