// Actor class.  Each actor starts life at the beginning of a path
// and follows that path to the end where it dies.

class Actor {
    constructor(game){
        // start off the actor in the first cell of the path
        this.pathIndex = 0;
        this.currentCell = game.path[this.pathIndex];
        this.nextCell = game.path[this.pathIndex+1];   // next in the path of cells
        // where this actor should aim -- the center of the next cell in the path
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2,
                            this.nextCell.loc.y + this.nextCell.height/2);
        this.lastCell = game.path[game.path.length-1];  // end of the path
        // position the actor initially in the center of the first cell
        this.loc = new JSVector(this.currentCell.loc.x + this.currentCell.width/2,
                                this.currentCell.loc.y + this.currentCell.height/2);
        this.vel = new JSVector(0,0);   // velocity
    }

    run() {
        this.update();
        this.render();
    }

    update(){
      let d1 = this.loc.distance(this.currentCell.center);
      let d2 = this.loc.distance(this.nextCell.center);
      if (d1 > d2){
        this.pathIndex++;
        this.currentCell = game.path[this.pathIndex];
        this.nextCell = game.path[this.pathIndex+1];
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2,
                            this.nextCell.loc.y + this.nextCell.height/2);
      }

      if(this.currentCell != this.lastCell){
        this.vel = JSVector.subGetNew(this.target, this.loc);
        this.vel.multiply(0.5);
        this.vel.limit(1);
        this.loc.add(this.vel);
      }
        // move this actor along the path until it reaches the end of
        // the path and dies
    }

    render(){
        let ctx = game.ctx;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }
}
