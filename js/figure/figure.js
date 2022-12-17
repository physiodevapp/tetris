class Figure {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim

    this.squares = []
  }

  set(action) {
    this.squares.forEach((square) => square.set(action))
  }

  draw() {
    this.squares.forEach((square) => square.draw())
  }
}