class Game {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.action = ''
    this.dropVel = 2

    this.newFigures = []
  }

  load() {
    this.initInteractions()
    this.initData()
    // console.log(this.matrix)
  }

  initInteractions() {
    document.getElementById('start-stop').onclick = (ev) => {
      switch (ev.target.innerHTML) {
        case 'PLAY':
          ev.target.innerHTML = 'STOP'
          this.start();
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
      switch (ev.keyCode) {
        case 39:
          this.action = 'right'
          break;
        case 37:
          this.action = 'left'
          break;
        default:
          this.action = ''
      }

      if (this.action && this.matrix.canSet(this.figure, this.action)) {
        this.move()
      }

      this.action = ''
    }
  }

  initData() {
    this.matrix = new Matrix(this.colDim, this.rowDim)
    this.addNewFigure()
  }

  start() {
    this.intervalId = setInterval(() => {
      this.check()
      this.move()
    }, 1000 / this.dropVel)
  }

  stop() {
    clearInterval(this.intervalId)
  }

  end() {
    this.stop()
    document.getElementById('start-stop').innerHTML = 'RESTART'
  }

  restart() {
    this.initData()
    this.start()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }

  draw() {
    this.figure.draw()
    this.matrix.draw()
  }

  move() { // Pongo set en vez de move porque realmente visualmente se ve cuando se draw
    if (this.matrix.canSet(this.figure, this.action)) {
      this.figure.set(this.action)
    }
    this.clear()
    this.draw()
  }

  check() {
    if (this.matrix.isOverflow()) {
      this.end()
    } else if (!this.matrix.canSet(this.figure, this.action)) {
      this.matrix.freeze(this.figure)
      this.addNewFigure()
    }
  }

  addNewFigure() {
    // this.figure = new O_Figure(this.ctx, this.colDim, this.rowDim)
    let newFigure
    while (this.newFigures.length < 2) {
      this.newFigures.push(this.chooseNewFigure())
    }
    switch (this.newFigures[0]) {
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
    this.newFigures.shift()

    this.figure = newFigure
    console.log(this.figure)
    console.log('next figure is: ', this.newFigures[0])
  }



  chooseNewFigure() {
    const letters = [73, 74, 76, 79, 83, 84, 90]
    const indexLetter = Math.floor(Math.random() * 7)
    return letters[indexLetter]
  }


}