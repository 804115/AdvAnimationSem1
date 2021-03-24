class EcoSystem {
    constructor() {
        this.canvas1 = document.getElementById('cnv1');
        this.context1 = this.canvas1.getContext('2d');
        this.canvas2 = document.getElementById('cnv2');
        this.context2 = this.canvas2.getContext('2d');
        this.canvas1Loc = new JSVector();


        this.world = {
            top: -1500,
            left: -2000,
            bottom: 1500,
            right: 2000,
            width: 4000,
            height: 3000
        }
        //  set number of cells in world
        //  set number of columns, rows and cell width-height
        this.numCols = 40;
        this.cellWidth = this.world.width / this.numCols;
        this.numRows = 30;
        this.cellHeight = this.world.height / this.numRows;

        //  load a 2D array of Cell objects
        this.cells = new Array(this.numRows);
        for(let r = 0; r < this.cells.length; r++){
          this.cells[r] = new Array(this.numCols);
          for(let c = 0; c < this.numCols; c++){
            let n = Math.random();
            let occ = false;
            if (n < 0.2){
              occ = true;
            }
            this.cells[r][c] = new Cell(this, r, c, occ);
          }
        }

        this.actor = new Actor(this);

              // canvas2 is scaled according to the ratio of its
        // height and width to the height and width of the world
        // so that the entire world fits within canvas2
        this.scaleX = this.canvas2.width / this.world.width;
        this.scaleY = this.canvas2.height / this.world.height;
        // add an event handler such that the a, s, w, d keys
        // will reposition the canvas within the world.
        window.addEventListener("keypress", function (event) {
          let actorCell = ecoSystem.cells[ecoSystem.actor.row][ecoSystem.actor.col];
            switch (event.code) {
                case "KeyW":
                    if (actorCell.neighbors.n){
                      ecoSystem.actor.row = ecoSystem.actor.row - 1;
                    }
                    break;
                case "KeyS":
                  if (actorCell.neighbors.s){
                    ecoSystem.actor.row = ecoSystem.actor.row + 1;
                  }
                    break;
                case "KeyA":
                  if (actorCell.neighbors.w){
                    ecoSystem.actor.col = ecoSystem.actor.col - 1;
                  }
                    break;
                case "KeyD":
                  if (actorCell.neighbors.e){
                    ecoSystem.actor.col = ecoSystem.actor.col + 1;
                  }
                    break;
                    break;
            }
        }, false);

        this.canvas1.addEventListener("click", function(event){
          console.log("x = " + event.offsetX);
          console.log("y = " + event.offsetY);

          let mouse = new JSVector(event.offsetX, event.offsetY);

          let mouseLoc = JSVector.addGetNew(mouse, ecoSystem.canvas1Loc);
          let topleft = new JSVector(ecoSystem.world.left, ecoSystem.world.top);
          mouseLoc = JSVector.subGetNew(mouseLoc, topleft);
          let c = Math.floor(mouseLoc.x/ecoSystem.cellWidth);
          let r = Math.floor(mouseLoc.y/ecoSystem.cellHeight);
          ecoSystem.cells[r][c].occ = !ecoSystem.cells[r][c].occ;
          ecoSystem.findAllNeighbors();
        }, false);

    } //  +++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

    findAllNeighbors(){
      for(let r = 0; r < this.numRows; r++){
        for(let c = 0; c < this.numCols; c++){
          this.cells[r][c].findNeighbors();
        }
      }
    }

    // function to run the game each animation cycle
    run() {

        let ctx1 = this.context1;
        let cnv1 = this.canvas1;
        let ctx2 = this.context2;
        let cnv2 = this.canvas2;
        ctx1.fillStyle = "#FFFFFF";
        ctx1.fillRect(0, 0, cnv1.width, cnv1.height);
        ctx2.fillStyle = "#AAAAAA";
        ctx2.fillRect(0, 0, cnv2.width, cnv2.height);

        ctx1.save();
        // translate according to the location of the canvas in the world
        ctx1.translate(-this.canvas1Loc.x, -this.canvas1Loc.y);
        // draw the bounds of the world in canvas1
        ctx1.beginPath();
        //ctx1.rect(this.world.left, this.world.top, this.world.width, this.world.height);
        ctx1.strokeStyle = "green";
        ctx1.lineWidth = 2;
        ctx1.stroke();
        //draw the x and y axes of the world in canvas1
        ctx1.beginPath();
        ctx1.moveTo(this.world.left, 0);
        ctx1.lineTo(this.world.right, 0);
        ctx1.moveTo(0, this.world.top);
        ctx1.lineTo(0, this.world.bottom);
        ctx1.strokeStyle = "red";
        ctx1.lineWidth = 2;
        ctx1.stroke();

        ctx2.save();
        // scale canvas2 to contain the entire world
        ctx2.scale(this.scaleX, this.scaleY);
        // center the world in canvas2
        ctx2.translate(this.world.width / 2, this.world.height / 2);
        // draw the x and y axes of the world
        ctx2.beginPath();
        ctx2.moveTo(this.world.left, 0);
        ctx2.lineTo(this.world.right, 0);
        ctx2.moveTo(0, this.world.top);
        ctx2.lineTo(0, this.world.bottom);
        ctx2.strokeStyle = "red";
        ctx2.lineWidth = 1 / this.scaleX;
        ctx2.stroke();

        // draw the outline of canvas1 in canvas2
        let c1x = this.canvas1Loc.x;
        let c1y = this.canvas1Loc.y;
        ctx2.beginPath();
        ctx2.strokeStyle = "blue";
        ctx2.lineWidth = 1 / this.scaleX;
        ctx2.rect(c1x, c1y, cnv1.width, cnv1.height);
        ctx2.stroke();

        //  Render the cells in the 2D array
        for (let r = 0; r < this.numRows; r++){
          for(let c = 0; c < this.numCols; c++){
            this.cells[r][c].run();
          }
        }

        this.actor.run();

        ctx1.restore();
        ctx2.restore();
    } // ++++++++++++++++++++++++  end run()


} //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Class
