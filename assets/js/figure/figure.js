class Figure {
  constructor(ctx, colDim, rowDim, isPanel = false, type = null, color = 'white') {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim

    this.xStart = !isPanel ? 5 : type === 73 ? 0 : type === 79 ? 1 : 0.5
    this.yStart = !isPanel ? -1 : type === 73 ? 1.5 : 1
    
    this.squares = []

    this.isPanel = isPanel
    this.type = type 

    this.color = color
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