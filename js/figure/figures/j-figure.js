class J_Figure extends Figure {
  constructor(ctx, colDim, rowDim) {
    super(ctx, colDim, rowDim)

    this.create()
  }

  create() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        if (j === 1 || i === 2) {
          const square = new Square(this.ctx, 6 + j, -1 + i, this.w, this.h)
          this.squares.push(square)
        }
      }
    }
  }

}