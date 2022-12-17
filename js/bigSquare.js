class BigSquare {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim

    this.squares = []

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

  set(action) {
    this.squares.forEach((square) => square.set(action))
  }

  draw() {
    this.squares.forEach((square) => square.draw())
  }

}