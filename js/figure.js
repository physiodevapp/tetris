class Figure {
  constructor(pattern, ctx, rowDim, colDim) {
    this.pattern = pattern
    this.ctx = ctx
    this.rowDim = rowDim
    this.colDim = colDim

    this.squares = []
  }

  create() {
    switch (this.pattern) {
      case 'square':
        for(let index = 0; index < 1; index++) {
          const square = new Square(this.ctx, 6, -1, this.ctx.canvas.clientWidth / this.colDim, this.ctx.canvas.clientHeight / this.rowDim)
          this.squares.push(square)
        }
        break;
      case 'row':
        for(let index = 0; index < 4; index++) {
          const square = new Square(this.ctx, 6 + index, -1, this.ctx.canvas.clientWidth / this.colDim, this.ctx.canvas.clientHeight / this.rowDim)
          this.squares.push(square)
        }
        break;
    }
  }

  setDown() {
    this.squares.forEach((square) => square.setDown())
  }
  
  setLeftRight(leftRight) {
    this.squares.forEach((square) => square.setLeftRight(leftRight))
  }

  draw() {
    this.squares.forEach((square) => square.draw())
  }
}