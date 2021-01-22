class Cell {
    constructor(ecosys, row, col) {
      this.ecosys = ecosys;
      this.row = row;
      this.col = col;
      this.loc = new JSVector(col*this.ecosys.cellWidth+this.ecosys.world.left,
        row*this.ecosys.cellHeight+this.ecosys.world.top);
    }//  +++++++++  end constructor

    run() {
      this.render();
    }

    render() {
      let cellTop = this.ecosys.cellHeight/-2;
      let cellLeft = this.ecosys.cellWidth/-2;
      let ctx1 = this.ecosys.context1;

      let r = Math.random()*100*25;
      let g = Math.random()*255;
      let b = Math.random()*255;
      let clr = "rgba(" + r +", " + g + ", " + b +")";
      ctx1.fillStyle = clr;

      ctx1.beginPath();
      ctx1.fillRect(this.loc.x, this.loc.y, this.ecosys.cellWidth, this.ecosys.cellHeight);
      ctx1.strokeRect(this.loc.x, this.loc.y, this.ecosys.cellWidth, this.ecosys.cellHeight);
      ctx1.lineWidth = 3;
      ctx1.font = "20px Arial";
      ctx.fillText = font;
      ctx1.restore();
      ctx1.save();

    }

} //+++++++++++++++++++++  end of Cell class
