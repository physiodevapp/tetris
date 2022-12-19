class O_Figure extends Figure {
  constructor(ctx, colDim, rowDim) {
    super(ctx, colDim, rowDim)

    this.position = 0
    this.positions = [0]

    this.create()
  }

  create() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const square = new Square(this.ctx, 6 + j, -1 + i, this.w, this.h)
        this.squares.push(square)
      }
    }
  }

  setRotation() {
    this.goNextPosition()
    switch (this.position) {
      case 0:
        for (let i = 0; i < this.squares.length; i++) {
          this.squares[i].x = this.squares[i].x
          this.squares[i].y = this.squares[i].y
        }
        break;
    } 
  }

}