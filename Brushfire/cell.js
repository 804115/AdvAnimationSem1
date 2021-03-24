class Cell {
    constructor(game, r, c, occ) {
        this.game = game;
        this.width = game.cellWidth;
        this.height = game.cellHeight;
        let x = c * this.width;
        let y = r * this.height;
        this.loc = new JSVector(x, y);
        this.center = new JSVector(x + this.width/2, y + this.height/2);
        this.r = r;
        this.c = c;
        this.parent = null;
        this.distance = 1000;
        this.neighbors = new Array();
        let m = Math.random();
        this.occ = false;
        if (m < 0.2){
          this.occ = true;
        }
    }//  +++++++++  end constructor

    loadNeighbors(){
      if(this.r > 0){ // check north
        if(!this.game.grid[this.r-1][this.c].occ){
          this.neighbors.push(this.game.grid[this.r-1][this.c]);
        }
      }
      if(this.c < this.game.numCols-1){ //check east
        if(!this.game.grid[this.r][this.c+1].occ){
          this.neighbors.push(this.game.grid[this.r][this.c+1]);
        }
      }
      if(this.r < this.game.numRows-1){ // check south
        if(!this.game.grid[this.r+1][this.c].occ){
          this.neighbors.push(this.game.grid[this.r+1][this.c]);
        }
      }
      if(this.c > 0){
        if(!this.game.grid[this.r][this.c-1].occ){
          this.neighbors.push(this.game.grid[this.r][this.c-1]);
        }
      }
    }

    run() {
        this.render();
        // this.update();
    }

    render() {
        let ctx = game.ctx;
        ctx.fillStyle = "pink";
        if(this.occ){
          ctx.fillStyle = "white";
        }

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(this.loc.x, this.loc.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.distance, this.loc.x + 5, this.loc.y + 20);
    }

    update() {

    }
}//+++++++++++++++++++++  end of Cell class
