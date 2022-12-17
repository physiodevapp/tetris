class Game {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.action = ''
    this.dropVel = 2
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
    // this.storeSquares = []
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
    this.figure = new BigSquare(this.ctx, this.colDim, this.rowDim)
    console.log(this.figure)
  }

  addNewSquare() {
    // this.square = new Square(this.ctx, 6, -1, this.ctx.canvas.clientWidth / this.colDim, this.ctx.canvas.clientHeight / this.rowDim)
    // console.log(this.square)
  }

  storeSquare() {
    // this.matrix.freeze(this.square)
    // this.storeSquares.push(this.square)
  }

}