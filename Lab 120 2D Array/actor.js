class Actor{
  constructor(ecosys){
    this.ecosys = ecosys;
    this.row = 17;
    this.col = 23;
    this.rad = 10;
  }

  run(){
    this.render();
  }

  render(){
    let ctx1 = this.ecosys.context1;
    ctx1.beginPath();
    ctx1.strokeStyle = "rgb(232, 60, 60 )";
    ctx1.fillStyle = "rgb(232, 60, 60 , .5)";
    let x = this.ecosys.cells[this.row][this.col].loc.x + this.ecosys.cellWidth/2;
    let y = this.ecosys.cells[this.row][this.col].loc.y + this.ecosys.cellHeight/2;
    ctx1.arc(x, y, this.rad, Math.PI*2, 0, false);
    ctx1.stroke();
    ctx1.fill();
  }
}
