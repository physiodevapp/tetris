class Figure {
  constructor(ctx, colDim, rowDim, isPanel = false, typePanel = null) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim

    this.xStart = !isPanel ? 5 : typePanel === 'I_Figure' ? 0 : typePanel === 'O_Figure' ? 1 : 0.5
    this.yStart = !isPanel ? -1 : typePanel === 'I_Figure' ? 1.5 : 1
    
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

  setNextPosition() {
    if (this.positions.includes(this.position + 1)) {
      this.position++
    } else {
      this.position = 0
    }
  }
}