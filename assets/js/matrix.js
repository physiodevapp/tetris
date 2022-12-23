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

  // ===============================================
  // CON AWAIT
  // *********
  async freeze(figure) {
    return new Promise(async (resolve) => {
      this.isFreezing = true
      figure.squares.forEach((square) => this.values[square.y][square.x] = square)
      await this.checkFullRows().then((linePacks) => {
        this.isFreezing = false
        resolve(linePacks)
      })
    })
  }

  async checkFullRows() {
    return new Promise(async (resolve) => {
      const fullRows = this.getFullRows()
      if (fullRows.length) {
        const linePacks = this.getFullRowPacks()
        const squares = fullRows
          .reduce((acc, curr) => {
            curr.forEach((square) => acc.push(square))
            return acc
          }, [])
        this.highlightSquares(squares)
        this.animateSquares(squares)
        setTimeout(async () => {          
          await this.deleteFullRows().then(() => {
            clearInterval(this.intervalId)
            resolve(linePacks)
          })
        }, 750)
      } else {
        resolve([])
      }
    })
  }

  highlightSquares(squares) {
    squares.forEach((square) => square.highlight())
  }

  animateSquares(squares) {
    let state = 1
    this.intervalId = setInterval(() => {
        squares.forEach((square) => square.flick(state))
        state++
      }, 100);
  }

  deleteFullRows() {
    return new Promise((resolve) => {
      for (let index = 0; index <= this.values.length; index++) {
        if (index === this.values.length) {
          resolve('deletion completed!')
        }
        const row = this.values[index]
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
      }      
    })
  }

  getFullRowPacks() {
    return this.values
      .reduce((acc, row) => {
        this.isFullRow(row) ? acc[acc.length - 1]++ : acc.push(0) 
        return acc
      }, [0])
      .filter((value) => value)
  }

  getFullRows() {
    return this.values.filter((row) => this.isFullRow(row))
  }

  isFullRow(row) {
    return row.every((value) => value !== null)
  }

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