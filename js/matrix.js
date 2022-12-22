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

  isGameover() {
    try { // en ocasiones, al llegar arriba del todo en el tablero, tira un error en game.js porque isOverflow() devuelve false cuando debería devolver true y el juego intenta continuar
      return !this.values[0].every((value) => value === null)
    } catch {
      return true
    }
  }


  getFullRows() {
    return this.values.filter((row) => row.every((value) => value !== null))
  }

  // ===============================================
  // CON AWAIT
  // *********
  async freeze(figure) {
    this.isFreezing = true
    figure.squares.forEach((square) => this.values[square.y][square.x] = square)
    await this.checkFullRows()
    this.isFreezing = false
  }

  async checkFullRows() {
    const fullRows = this.getFullRows()
    if (fullRows.length) {
      const squares = fullRows
        .reduce((acc, curr) => {
          curr.forEach((square) => acc.push(square))
          return acc
        }, [])
      await this.animateSquares(squares)
      this.deleteFullRows()
    }
  }

  animateSquares(squares) {
    let state = 1;
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        squares.forEach((square) => square.flick(state))
        if (state++ === (3 * 2)) {
          clearInterval(intervalId)
          resolve('animation completed!')
        }
      }, 100);
    })
  }

  animateRow(row) {
    let count = 1;
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        row.forEach((square) => square.flick(count))
        if (count++ === (3 * 2)) {
          clearInterval(intervalId)
          resolve('animation completed!')
        }
      }, 100);
    })
  }

  async deleteFullRows() {
    for (let index = 0; index < this.values.length; index++) {
      const row = this.values[index]
      if (row.every((value) => value !== null)) {
        // await this.animateRow(row)
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
    }
  }

  // SIN AWAIT
  // *********
  freeze_sync(figure) {
    this.isFreezing = true
    figure.squares.forEach((square) => this.values[square.y][square.x] = square)
    this.checkFullRows_sync()
    // this.isFreezing = false => va en el checkFullRows_sync()
  }

  checkFullRows_sync() {
    const fullRows = this.getFullRows()
    if (fullRows.length) {
      const squares = fullRows
        .reduce((acc, curr) => {
          curr.forEach((square) => acc.push(square))
          return acc
        }, [])
      this.animateSquares_sync(squares)
      this.deleteFullRows_sync()
      // this.isFreezing = false => va en el deleteFullRows_sync()
    } else {
      this.isFreezing = false
    }
  }

  animateSquares_sync(squares) {
    let state = 1;
    const intervalId = setInterval(() => {
      squares.forEach((square) => square.flick(state))
      if (state++ === (3 * 2)) {
        clearInterval(intervalId)
      }
    }, 100);
  }

  deleteFullRows_sync() {
    this.values.forEach(async (row, index) => {
      if (row.every((value) => value !== null)) {
        let count = 1;
        const intervalId = setInterval(() => {
          row.forEach((square) => square.flick(count))
          if (count++ === (2 * 2)) {
            clearInterval(intervalId)
            // console.log('animation completed!')
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

            this.isFreezing = false
          }
        }, 200);

      }
    })
  }

  // ===============================================

  isBlocked(figure) {
    const actions = ['left', 'right', 'down']
    return actions
      .map((action) => {
        const result = this.canSet(figure, action)
        return result
      })
      .every((result) => result === false)
  }

  canSet(figure, action) {
    let testFigure = figure
    if (action === 'rotate') {
      testFigure = figure.clone()
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