class Matrix {
  constructor(colDim, rowDim) {
    this.colDim = colDim
    this.rowDim = rowDim

    this.values = this.create()
  }

  create() {
    return new Array(this.rowDim)
      .fill(null)
      .map(() => new Array(this.colDim).fill(null))
  }

  isOverflow() {
    try { // en ocasiones, al llegar arriba del todo en el tablero, tira un error en game.js porque isOverflow() devuelve false cuando debería devolver true y el juego intenta continuar
      return !this.values[0].every((value) => value === null)
    } catch {
      return true
    }
  }

  checkFullRows() {
    if (this.existsFullRows()) {
      this.deleteFullRows()
    }
  }

  existsFullRows() {
    return this.values.filter((row) => row .every((value) => value !== null)).length
  }

  deleteFullRows() {
    console.log('deleteFullRows')
    this.values.forEach((row, index) => {
      if (row.every((value) => value !== null)) {
        this.values.splice(index, 1)
        this.values
          .filter((row, overIndex) => overIndex < index)
          .forEach((row) => {
            row
              .filter((value) => value !== null)
              .forEach((square) => {
                square.y++
              })
          })
        this.values.unshift(new Array(this.colDim).fill(null))
      }
    })
  }

  canSet(figure, action) {
    const testFigure = figure.clone()
    if (action === 'rotate') {
      testFigure.setRotation()
    }
    return testFigure.squares.every((square) => this.doesFit(square, action))
  }

  doesFit(square, action) {
    let x = 0;
    let y = 0
    switch (action) {
      case 'rotate':
        break;
      case 'left':
        x--
        break;
      case 'right':
        x++
        break;
      case 'down':
      default:
        y++
        break;
    }
    return square.y + y < this.rowDim &&
      square.x + x < this.colDim &&
      this.values[square.y + y][square.x + x] === null
  }

  freeze(figure) {
    figure.squares.forEach((square) => this.values[square.y][square.x] = square)
    // console.log(this.values)
  }

  draw() {
    this.values.forEach((row) => {
      row.forEach((square) => {
        if (square) {
          square.draw()
        }
      })
    })
  }


}