class Game {
  constructor(canvas, colDim, rowDim) {
    this.ctx = canvas.getContext('2d')

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.dropVel = 60
    this.drop = 0

    this.newFigures = []

  }

  load() {
    this.initGrid()
    this.initInteractions()
    this.initData()
  }

  initInteractions() {
    document.getElementById('start-stop').onclick = (ev) => {
      switch (ev.target.innerHTML) {
        case 'PLAY':
          ev.target.innerHTML = 'STOP'
          this.play();
          break;
        case 'STOP':
          ev.target.innerHTML = 'PLAY'
          this.stop();
          break;
        case 'RESTART':
          ev.target.innerHTML = 'STOP'
          this.restart();
          break;
      }
    }

    document.body.onkeydown = (ev) => {
      // console.log(ev)
      if (!this.intervalId) {
        return null
      }
      let action;
      switch (ev.keyCode) {
        case 39:
          action = 'right'
          break;
        case 37:
          action = 'left'
          break;
        case 38:
          action = 'rotate'
          break;
        case 40:
          action = 'down'
          break;
        default:
          action = ''
      }

      if (action) {
        this.moveFigure(action)
      }
    }
  }

  initData() {
    this.matrix = new Matrix(this.colDim, this.rowDim)
    this.addNewFigure()
  }

  initGrid() {
    this.grid = new Grid(canvas.parentElement.firstElementChild.getContext('2d'), this.colDim, this.rowDim)
    this.grid.draw()
  }

  play() {
    this.intervalId = setInterval(() => {
      if (this.drop++ >= this.dropVel) {
        this.drop = 0
        this.nextFigure()
        this.moveFigure('down')
      }
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  end() {
    this.stop()
    document.getElementById('start-stop').innerHTML = 'RESTART'
  }

  restart() {
    this.initData()
    this.play()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }

  draw() {
    this.figure.draw()
    this.matrix.draw()
  }

  async moveFigure(action = 'down') {
    if (this.matrix.canSet(this.figure, action)) {
      if (action === 'rotate') {
        this.figure.setRotation()
      } else {
        this.figure.setTranslation(action)
      }
    } 
    
    this.clear()
    this.draw()
    
    if (this.matrix.isBlocked(this.figure) && !this.matrix.isFreezing) {
      console.log('BLOCKED')
      // // this.addNewFigure()
      this.matrix.freeze(this.figure)
      await this.matrix.checkFullRows()
      this.matrix.isFreezing = false
    }

  }

  async nextFigure() {
    if (this.matrix.isGameover()) {
      this.end()
    } else if (!this.matrix.canSet(this.figure, 'down')) {
      console.log('nextFigure')
      this.frozenFigure = this.figure
      this.addNewFigure()
      if (!this.matrix.isFreezing) {
        this.matrix.freeze(this.frozenFigure)
        await this.matrix.checkFullRows()
        this.matrix.isFreezing = false
      }
    }
  }
  
  addNewFigure() {
    while (this.newFigures.length < 2) {
      this.newFigures.push(this.chooseNewFigure())
    }
    this.figure = this.newFigures[0]
    this.newFigures.shift()

    // console.log('next figure is: ', this.newFigures[0])
    // console.log(this.figure)
  }

  chooseNewFigure() {
    let newFigure;
    const letters = [73, 74, 76, 79, 83, 84, 90]
    const index = Math.floor(Math.random() * 7)
    switch (letters[index]) {
      case 73:
        newFigure = new I_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 74:
        newFigure = new J_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 76:
        newFigure = new L_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 79:
        newFigure = new O_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 83:
        newFigure = new S_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 84:
        newFigure = new T_Figure(this.ctx, this.colDim, this.rowDim)
        break;
      case 90:
        newFigure = new Z_Figure(this.ctx, this.colDim, this.rowDim)
        break;
    }
    return newFigure
  }


}