class Figure {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim

    this.squares = []
  }

  setTranslation(action) {
    this.squares.forEach((square) => square.setTranslation(action))
  }

  draw() {
    this.squares.forEach((square) => square.draw())
  }

  clone() {
    const figure =  Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    figure.squares = figure.squares.map(square => Object.assign(Object.create(Object.getPrototypeOf(square)), square))
    // console.log('clone ', figure)
    return figure;
  }

  goNextPosition() {
    if (this.positions.includes(this.position + 1)) {
      this.position++
    } else {
      this.position = 0
    }
  }
}