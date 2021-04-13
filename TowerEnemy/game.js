function Game(){
    this.ga = new GameArea();
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d'); // This is the context

    this.snakes = [];
    this.createSnakes(this.canvas, 4);

    //  set number of cells in grid
    this.numCols = 20;
    this.cellWidth = this.canvas.width / this.numCols;
    this.numRows = 13;
    this.cellHeight = this.canvas.height / this.numRows;

    // Create the two-dimensional grid of cells
    this.grid = new Array(this.numRows);
    // Populate the grid of cells
    for (let r = 0; r < this.grid.length; r++) {
        this.grid[r] = new Array(this.numCols);
        for (let c = 0; c < this.grid[r].length; c++) {
            this.grid[r][c] = new Cell(this, r, c);
        }
    }

    // Create a path for the actors to follow.
    // The path is an array of cells as specified in a separate file.
    this.path = [];
    for(let c = 0; c < pathCells.length; c++){
        let cell = this.grid[pathCells[c][0]][pathCells[c][1]];
        cell.isPath = true;
        this.path.push(cell);
    }

    // Create an actor to follow the path.
    // Additional actors may be created periodically.
    this.actors = [];
    this.actors.push(new Actor(this));  // one actor initially

}//++++++++++++++++++++++  end Game constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.numCols; c++) {
            this.grid[r][c].run();
        }
    }
    // Show the end cell
    this.ctx.fillStyle = "brown";
    this.ctx.font = '18px sans-serif';
    let endCell = this.path[this.path.length-1];
    this.ctx.fillText("End", endCell.loc.x + endCell.width/2 - 16,
                    endCell.loc.y + endCell.height/2 + 8);

    for(let i = 0; i < this.snakes.length; i++){
        this.snakes[i].run();
    }

    // run all the actors
    for(let i = 0; i < this.actors.length; i++){
        this.actors[i].run();
    }

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
