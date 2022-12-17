class I_Figure extends Figure {
  constructor(ctx, colDim, rowDim) {
    super(ctx, colDim, rowDim)

    this.create()
  }

  create() {
    for (let i = 0; i < 4; i++) {
      const square = new Square(this.ctx, 6 + i, -1, this.w, this.h)
      this.squares.push(square)
    }

    return this.squares
  }

}