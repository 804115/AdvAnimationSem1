function Game(){
    game = this;
    let numVehicles = 15;
    let numBoids = 3;
    this.canvas1 = document.getElementById('cnv1');
    this.context1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('cnv2');
    this.context2 = this.canvas2.getContext('2d');
    this.movers = [];
    this.snakes = [];


    this.canvas1Loc = new JSVector();

    this.world = {
        top: -1500,
        left: -2000,
        bottom: 1500,
        right: 2000,
        width: 4000,
        height: 3000
    }

    this.createSnakes(this.world, 10);

    for(let i = 0; i < 15; i++){
      this.createMover(this.world);
    }

    this.ps = new ParticleSystem();
    this.vehicles = [];
    this.boids = [];

    // fill vehicles
    for(let i = 0; i < 20; i++){
      this.vehicles.push(new Vehicle(Math.random()*this.world.width, Math.random()*this.world.height));
    }

    // fill boids
    for(let i = 0; i < numBoids; i++){
      this.boids.push(new Boid(Math.random()*this.world.width, Math.random()*this.world.height));
    }

    // canvas2 is scaled according to the ratio of its
    // height and width to the height and width of the world
    // so that the entire world fits within canvas2
    this.scaleX = this.canvas2.width/this.world.width;
    this.scaleY = this.canvas2.height/this.world.height;

    // add an event handler such that the a, s, w, d keys
    // will reposition the canvas within the world.
    window.addEventListener("keypress", function(event){
        switch(event.code){
            case "KeyW":
                if(game.canvas1Loc.y+100 > game.world.top)
                    game.canvas1Loc.y -= 20;
                break;
            case "KeyS":
                if(game.canvas1Loc.y + game.canvas1.height -100 < game.world.bottom)
                    game.canvas1Loc.y += 20;
                break;
            case "KeyA":
                if(game.canvas1Loc.x+100 > game.world.left)
                    game.canvas1Loc.x -= 20;
                break;
            case "KeyD":
                if(game.canvas1Loc.x + game.canvas1.width -100 < game.world.right)
                    game.canvas1Loc.x += 20;
                break;
            break;
            }
    }, false);

}//++++++++++++++++++++++  end game constructor






// function to run the game each animation cycle
Game.prototype.run = function(){

  let ctx1 = this.context1;
  let cnv1 = this.canvas1;
  let ctx2 = this.context2;
  let cnv2 = this.canvas2;
  ctx1.fillStyle =  "#505050";
  ctx1.fillRect(0,0,cnv1.width,cnv1.height);
  ctx2.fillStyle =  "#505050";
  ctx2.fillRect(0,0,cnv2.width,cnv2.height);

  // translate canvas1 according to the location of the canvas in the world
  ctx1.save();
  ctx1.translate(-this.canvas1Loc.x, -this.canvas1Loc.y);

  // draw the bounds of the world in canvas1
  ctx1.beginPath();
  ctx1.rect(this.world.left, this.world.top, this.world.width, this.world.height);
  ctx1.lineWidth = 3;
  ctx1.strokeStyle = "rgba(0, 255, 0)";
  ctx1.stroke();

  // draw the x and y axes of the world in canvas1
  ctx1.beginPath();
  ctx1.moveTo(this.world.left, 0);
  ctx1.lineTo(this.world.right, 0);
  ctx1.moveTo(0, this.world.top);
  ctx1.lineTo(0, this.world.bottom);
  ctx1.lineWidth = 3;
  ctx1.strokeStyle = "rgba(200, 0, 0)";
  ctx1.stroke();

  // scale canvas2 to contain the entire world
  ctx2.save();
  ctx2.scale(this.scaleX, this.scaleY);

  // center the world in canvas2
  ctx2.translate(this.world.width/2, this.world.height/2);

  // draw the x and y axes of the world
  ctx2.beginPath();
  ctx2.moveTo(this.world.left, 0);
  ctx2.lineTo(this.world.right, 0);
  ctx2.moveTo(0, this.world.top);
  ctx2.lineTo(0, this.world.bottom);
  ctx2.lineWidth = 3/this.scaleX;
  ctx2.strokeStyle = "rgba(200, 0, 0)";
  ctx2.stroke();

  // draw the outline of canvas1 in canvas2
  ctx2.beginPath();
  ctx2.rect(this.canvas1Loc.x, this.canvas1Loc.y, this.canvas1.width, this.canvas1.height);
  ctx2.lineWidth = 3/this.scaleY;
  ctx2.strokeStyle = "blue";
  ctx2.stroke();


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

  // run all the actors

  ctx1.restore();
  ctx2.restore();

}

    Game.prototype.createMover = function(canvas){
        var x, y, dx, dy, radius, clr, r, g, b, numOrbs;
        radius = 7;
        x = Math.random()*this.world.width-this.world.width/2;;
        y = Math.random()*this.world.height-this.world.height/2;
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
        x = Math.random()*this.world.width-this.world.width/2;
        y = Math.random()*this.world.height-this.world.height/2;
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
    }
