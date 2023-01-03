class Game {
  constructor(canvas, colDim, rowDim) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.dropVel = 60
    this.drop = 0

    this.newFigures = []

    this.isIntervalPaused = false

    this.random = new Random()

    this.playState = -1

    this.audioGameover = new Audio('/assets/audio/mixkit-arcade-retro-game-over-213.wav')
    this.audioGameover.volume = 0.25

    this.audioStart = new Audio('/assets/audio/mixkit-small-win-2020.wav')
    this.audioStart.volume = 0.25

    document.getElementById('container-game-over').style.backgroundColor = GAMEOVER_BACKGROUND_COLOR
  }

  load() {
    this.initBackground()
    this.initData()
    this.initGrid()
    this.initInteractions()
    this.initPanels()
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  exitFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  initBackground() {
    this.background = new Background(document.getElementById('background').getContext('2d'))
    this.background.load()
    this.background.start()
  }


  initPanels() {
    const infoPanel = document.getElementById('info-panel')
    infoPanel.style.height = `${this.canvas.parentElement.parentElement.offsetHeight}px`
    infoPanel.style.width = `${this.canvas.clientWidth * 0.5}px`

    this.score = new Score()
    this.score.render()

    this.panelFigure = new PanelFigure()
    this.panelFigure.render(
      this.newFigures[this.newFigures.length - 1].type,
      this.newFigures[this.newFigures.length - 1].color
    )
  }

  initInteractions() {
    document.getElementById('start-stop-btn').onclick = () => {
      if (document.getElementById('board').classList.contains('slide-out-left')) {
        this.showBoard()
        setTimeout(() => {
          this.togglePlayState()
        }, 1350)
      } else {
        this.togglePlayState()
      }
    }

    document.getElementById('menu-btn').onclick = () => {
      this.clickMenuBtn()
    }

    document.body.onkeyup = (ev) => {  // uso de keyup por tratarse de la tecla espaciadora
      switch (ev.keyCode) {
        case 32:
          if (document.getElementById('board').classList.contains('slide-out-left')) {
            this.showBoard()
            setTimeout(() => {
              this.togglePlayState()
            }, 1350)
          } else {
            this.togglePlayState()
          }
          break;
      }
    }

    document.body.onkeydown = (ev) => {
      if (!this.intervalId && ev.keyCode !== 77) {
        return null
      }
      let action = null;
      switch (ev.keyCode) {
        case 77:
          this.clickMenuBtn()
          break;
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

  clickMenuBtn() {
    if (this.playState === -2) {
      return null
    }
    if (document.getElementById('board').classList.contains('slide-out-left')) {
      this.showBoard()
    } else {
      if (this.playState === 1) {
        this.togglePlayState()
      }
      this.showMenu()
    }
  }

  showMenu() {
    document.getElementById('board').classList.add('slide-out-left')
    document.getElementById('menu').classList.add('slide-in-right')

    document.getElementById('board').classList.remove('slide-in-left')
    document.getElementById('menu').classList.remove('slide-out-right')
  }

  showBoard() {
    document.getElementById('board').classList.add('slide-in-left')
    document.getElementById('menu').classList.add('slide-out-right')

    document.getElementById('board').classList.remove('slide-out-left')
    document.getElementById('menu').classList.remove('slide-in-right')
  }

  isGameover() {
    return !this.figure.squares.every((square) => square.y >= 0) &&
      !this.matrix.canSet(this.figure, 'down')
  }

  togglePlayState() {
    switch (this.playState) {
      case -2:
      case -1:
      case 0:
        document.getElementById('start-stop-icon').setAttribute('href', '/assets/img/pause-1.png')
        this.playState === -2 ? this.restart() : this.play();
        this.playState = 1
        break;
      case 1:
        // TODO: alternar filled con outlined dependiendo si pauso en board o en menu
        document.getElementById('start-stop-icon').setAttribute('href', '/assets/img/play-filled.png')
        this.stop();
        this.playState = 0
        break;
    }
  }

  play() {
    this.intervalId = setInterval(() => {
      if (this.drop++ >= this.dropVel && !this.isIntervalPaused) {
        this.drop = 0
        this.nextFigure()
      }
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  end() {
    this.playState = -2
    document.getElementById('start-stop-icon').setAttribute('href', '/assets/img/reset-1.png')
    this.stop()
  }

  restart() {
    this.clear()
    this.initData()
    this.hideGameover()
    this.play()
  }

  showGameover() {
    this.audioGameover.play()
    document.getElementById('container-game-over').classList.add('swirl-in-fwd')
    document.getElementById('container-game-over').classList.remove('slide-out-blurred-top')
  }

  hideGameover() {
    this.audioStart.play()
    document.getElementById('container-game-over').classList.add('slide-out-blurred-top')
    document.getElementById('container-game-over').classList.remove('swirl-in-fwd')
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }

  draw() {
    this.figure.draw()
    this.matrix.draw()
  }

  moveFigure(action = '') {
    if (this.isIntervalPaused) {
      return null
    }

    if (this.matrix.canSet(this.figure, action)) {
      if (action === 'down') {
        this.score.total++
        this.score.render()
      }

      if (action === 'rotate') {
        this.figure.setRotation()
      } else {
        this.figure.setTranslation(action)
      }
    }

    this.render() // permite dibujar hasta la parte de la figura que quepa, auqneu vaya a terminarse la partida

    if (this.isGameover()) {
      this.showGameover()
      this.end()
      return null
    }

    if (this.matrix.isBlocked(this.figure) && this.matrix.canFreeze()) {
      this.matrix.isChecked = true
      this.isIntervalPaused = true
      this.matrix.freeze(this.figure).then((linePacks) => {
        this.score.linesToScore(linePacks)
        this.score.render()
        this.isIntervalPaused = false
      })
    }
  }

  render() {
    this.clear()
    this.draw()
  }

  nextFigure() {
    if (!this.matrix.canSet(this.figure, 'down')) {
      this.frozenFigure = this.figure
      this.addNewFigure() // para que no tenga que esperar a completarse el 'freeze()'
      if (this.matrix.canFreeze()) {
        this.isIntervalPaused = true
        this.matrix.freeze(this.frozenFigure).then((linePacks) => {
          this.score.linesToScore(linePacks)
          this.score.render()
          this.isIntervalPaused = false

          this.moveFigure()
        })
      } else {
        this.moveFigure()
      }
      this.matrix.isChecked = false
    } else {
      this.moveFigure()
    }
  }

  addNewFigure() {
    while (this.newFigures.length < 2) {
      this.newFigures.push(this.random.getFigure(this.ctx, this.colDim, this.rowDim))
    }
    this.figure = this.newFigures[0]
    this.newFigures.shift()

    if (this.panelFigure) {
      this.panelFigure.render(
        this.newFigures[this.newFigures.length - 1].type,
        this.newFigures[this.newFigures.length - 1].color
      )
    }
  }

}