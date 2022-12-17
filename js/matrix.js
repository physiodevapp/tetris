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
    return !this.values[0].every((value) => value === null)
  }

  canSet(figure, action) {
    return figure.squares.every((square) => this.fit(square, action))
  }
  
  fit(square, action) {
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

  canSetDown(square) {
    if (square.y >= this.rowDim - 1) {
      return false
    }
    const canDown = !this.values[square.y + 1][square.x];

    return canDown
  }

  canSetLeftRight(square, leftRight) {
    // a veces me devuelve error 'cannot read property of undefined' si desplazo horizontalmente sobre la última línea inferior libre antes de almacenar el square
    // ...hacer un try catch??... parece que funcion
    let canLeftRight;
    try {
      switch (leftRight) {
        case 'right':
          canLeftRight = this.values[square.y][square.x + 1] === null
          break;
        case 'left':
          canLeftRight = this.values[square.y][square.x - 1] === null
          break;
        default:
          canLeftRight = false
      }
      return canLeftRight
    } catch (error) {
      // console.log(error)
      return false
    }
    // return true
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