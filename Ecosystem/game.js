function Game(){
    game = this;
    let numVehicles = 15;
    let numBoids = 3;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.movers = [];
    this.snakes = [];
    this.createSnakes(this.canvas, 10);

    for(let i = 0; i < 15; i++){
      this.createMover(this.canvas);
    }

    this.ps = new ParticleSystem();
    this.vehicles = [];
    this.boids = [];

    // fill vehicles
    for(let i = 0; i < 20; i++){
      this.vehicles.push(new Vehicle(Math.random()*this.canvas.width, Math.random()*this.canvas.height));
    }

    // fill boids
    for(let i = 0; i < numBoids; i++){
      this.boids.push(new Boid(Math.random()*this.canvas.width, Math.random()*this.canvas.height));
    }


}

// function to run the game each animation cycle
Game.prototype.run = function(){
  // orbiters
  if(!this.gamePaused){
    for(let i = 0; i < this.movers.length; i++){
      this.movers[i].run();
      if(this.movers[i].isDead){
        this.movers.splice(i, 1);
        i--;
      }
   }
   for(let i = 0; i < this.snakes.length; i++){
     this.snakes[i].run();
  }

  // particle system
  this.ps.run();

  //run vehicles for flocking
  for(let i = 0; i < this.vehicles.length; i++){
    this.vehicles[i].run(this.vehicles);
  }


  for(let i = 0; i < this.boids.length;i++){
    this.boids[i].run(this.boids);
  }

}

}

    Game.prototype.createMover = function(canvas){
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

      return this.movers;
    }

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
