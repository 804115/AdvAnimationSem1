class Cell {
    constructor(ecosys, row, col, occ) {
      let r = Math.random()*200*55;
      let g = Math.random()*255;
      let b = Math.random()*255;
      this.clr = "rgba(" + r +", " + g + ", " + b +")";
      this.ecosys = ecosys;
      this.row = row;
      this.col = col;
      this.occ = occ;
      this.loc = new JSVector(col*this.ecosys.cellWidth+this.ecosys.world.left,
        row*this.ecosys.cellHeight+this.ecosys.world.top);
      this.neighbors = {
        n: null,
        e: null,
        s: null,
        w: null
      }
    }//  +++++++++  end constructor

    run() {
      this.render();
    }

    findNeighbors(){
      if(this.row > 0){ // check north
        if(!this.ecosys.cells[this.row-1][this.col].occ){
          this.neighbors.n = this.ecosys.cells[this.row-1][this.col];
        }
      }
      if(this.col < this.ecosys.numCols-1){ //check east
        if(!this.ecosys.cells[this.row][this.col+1].occ){
          this.neighbors.e = this.ecosys.cells[this.row][this.col+1];
        }
      }
      if(this.row < this.ecosys.numRows-1){ // check south
        if(!this.ecosys.cells[this.row+1][this.col].occ){
          this.neighbors.s = this.ecosys.cells[this.row+1][this.col];
        }
      }
      if(this.col > 0){
        if(!this.ecosys.cells[this.row][this.col-1].occ){
          this.neighbors.w = this.ecosys.cells[this.row][this.col-1];
        }
      }
    }

    render() {

      if(this.occ){
        this.clr = "rgba(128, 187, 123)";
      } else {
        this.clr = "rgba(249, 203, 221 )";
      }
      let ctx1 = this.ecosys.context1;

      ctx1.fillStyle = this.clr;

      ctx1.beginPath();
      ctx1.fillRect(this.loc.x, this.loc.y, this.ecosys.cellWidth, this.ecosys.cellHeight);
      ctx1.strokeRect(this.loc.x, this.loc.y, this.ecosys.cellWidth, this.ecosys.cellHeight);
      ctx1.strokeStyle = "black";
      ctx1.lineWidth = 3;
      ctx1.font = "10px Arial";
      ctx1.fillStyle = "black";
      ctx1.fillText("c: " + this.col, this.loc.x + 5, this.loc.y - 85);
      ctx1.fillText("r: " + this.row, this.loc.x + 5, this.loc.y - 75);


    }

} //+++++++++++++++++++++  end of Cell class
