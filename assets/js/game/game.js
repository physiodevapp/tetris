class Game {
  constructor(canvas, colDim, rowDim) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.dropVel = 60
    this.drop = 0

    this.prevFigures = []
    this.newFigures = []

    this.isIntervalPaused = false

    this.random = new Random()

    this.playState = -1

    this.isMenuVisible = false

    this.isControlsAnimationActive = false

    this.audioGameover = new Audio('./assets/audio/mixkit-arcade-retro-game-over-213.wav')
    this.audioGameover.volume = 0.25

    this.audioStart = new Audio('./assets/audio/mixkit-small-win-2020.wav')
    this.audioStart.volume = 0.25

    document.getElementById('container-game-over').style.backgroundColor = GAMEOVER_BACKGROUND_COLOR

    this.menuBtnAnimationDuration = 1350

  }

  load() {
    this.initBackground()
    this.initPanels()
    this.initData()
    this.initGrid()
    this.initInteractions()
    // this.initPanels()
  }

  // openFullscreen(elem) {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) { /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) { /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

  // exitFullScreen() {
  //   if (document.fullscreenElement) {
  //     document.exitFullscreen()
  //   }
  // }

  initBackground() {
    this.background = new Background(document.getElementById('background').getContext('2d'))
    this.background.load()
    this.background.start()
  }

  initData() {
    this.isFirstFigure = true
    this.allowLetters = LETTERS
    this.matrix = new Matrix(this.colDim, this.rowDim)
    this.addNewFigure()
  }

  initPanels() {
    const infoPanel = document.getElementById('info-panel')
    infoPanel.style.height = `${this.canvas.parentElement.parentElement.offsetHeight}px`
    infoPanel.style.width = `${this.canvas.clientWidth * 0.5}px`

    this.score = new Score()
    this.score.render()

    this.panelFigure = new PanelFigure()
  }

  initInteractions() {
    document.getElementById('start-stop-btn').onclick = () => {
      if (this.isControlsAnimationActive) {
        return null
      }
      this.clickStartStopBtn()
    }

    document.getElementById('menu-btn').onclick = () => {
      if (this.isControlsAnimationActive) {
        return null
      }
      this.clickMenuBtn()
    }

    document.body.onkeyup = (ev) => {  // uso de keyup por tratarse de la tecla espaciadora
      switch (ev.keyCode) {
        case 32:
          if (this.isControlsAnimationActive) {
            return null
          }
          if (document.getElementById('board').classList.contains('slide-out-left')) {
            this.clickMenuBtn(true)
          } else {
            this.clickStartStopBtn()
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
          if (this.isControlsAnimationActive) {
            return null
          }
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

  initGrid() {
    this.grid = new Grid(canvas.parentElement.firstElementChild.getContext('2d'), this.colDim, this.rowDim)
    this.grid.draw()
  }

  clickStartStopBtn() {
    if (document.getElementById('board').classList.contains('slide-out-left')) {
      this.showBoard()
      setTimeout(() => {
        this.togglePlayState()
      }, this.menuBtnAnimationDuration)
    } else {
      this.togglePlayState()
    }
  }

  clickMenuBtn(resume = false) {
    if (this.playState === -2) {
      return null
    }
    if (document.getElementById('board').classList.contains('slide-out-left')) {
      this.showBoard()
      this.setIcons()
      if (resume) {
        setTimeout(() => {
          this.clickStartStopBtn()
        }, this.menuBtnAnimationDuration);
      }
    } else {
      this.showMenu()
      if (this.playState === 1) {
        this.togglePlayState()
      } else {
        this.setIcons()
      }
    }
  }

  showMenu() {
    this.isMenuVisible = true
    this.isControlsAnimationActive = true
    document.getElementById('menu').scrollTop = 0;

    document.getElementById('board').classList.add('slide-out-left')
    document.getElementById('menu').classList.add('slide-in-right')

    document.getElementById('board').classList.remove('slide-in-left')
    document.getElementById('menu').classList.remove('slide-out-right')

    document.getElementById('menu-icon').classList.add('rotate-left')
    document.getElementById('menu-icon').classList.remove('rotate-right')

    setTimeout(() => {
      this.isControlsAnimationActive = false
    }, this.menuBtnAnimationDuration);
  }

  showBoard() {
    this.isMenuVisible = false
    this.isControlsAnimationActive = true

    document.getElementById('board').classList.add('slide-in-left')
    document.getElementById('menu').classList.add('slide-out-right')

    document.getElementById('board').classList.remove('slide-out-left')
    document.getElementById('menu').classList.remove('slide-in-right')

    document.getElementById('menu-icon').classList.add('rotate-right')
    document.getElementById('menu-icon').classList.remove('rotate-left')

    setTimeout(() => {
      this.isControlsAnimationActive = false
    }, this.menuBtnAnimationDuration);
  }

  isGameover() {
    return !this.figure.squares.every((square) => square.y >= 0) &&
      !this.matrix.canSet(this.figure, 'down')
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

  togglePlayState() {
    switch (this.playState) {
      case -2:
      case -1:
      case 0:
        this.playState === -2 ? this.restart() : this.play();
        this.playState = 1
        break;
      case 1:
        this.stop();
        this.playState = 0
        break;
    }
    this.setIcons()
  }

  setIcons() {
    this.setStartStopIcon()
    this.setMenuIcon()
  }

  setStartStopIcon() {
    switch (this.playState) {
      case 1:
        document.getElementById('start-stop-icon').setAttribute('href', './assets/img/pause-1.png')
        break;
      default:
        const timeout = (document.getElementById('menu-icon').classList.contains('rotate-right') &&
          document.getElementById('menu-icon').getAttribute('outlined')) === 'true' || document.getElementById('start-stop-icon').getAttribute('outlined') === 'false' ? 0 : this.menuBtnAnimationDuration
        setTimeout(() => {
          document.getElementById('start-stop-icon').setAttribute('outlined', this.isMenuVisible)
          document.getElementById('start-stop-icon').setAttribute('href', `./assets/img/${this.isMenuVisible ? 'play-outlined' : 'play-filled'}.png`)
        }, timeout);
    }
  }

  setMenuIcon() {
    const timeout = document.getElementById('menu-icon').classList.contains('rotate-right') &&
      this.playState !== 1 ? this.menuBtnAnimationDuration : 0
    setTimeout(() => {
      document.getElementById('menu-icon').setAttribute('outlined', !this.isMenuVisible)
      document.getElementById('menu-icon').setAttribute('href', `./assets/img/${this.isMenuVisible ? 'gear-filled' : 'gear-outlined'}.png`)
    }, timeout)
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
    this.showGameover()
    this.playState = -2
    document.getElementById('start-stop-icon').setAttribute('href', './assets/img/reset-1.png')
    this.stop()
  }

  restart() {
    this.clear()
    this.initData()
    this.hideGameover()
    this.play()
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

      if (this.isFirstFigure) {
        this.isFirstFigure = false
        this.panelFigure.render(
          this.newFigures[this.newFigures.length - 1].type,
          this.newFigures[this.newFigures.length - 1].color
        )
        this.newFigures.shift()
      }
    }

    this.render() // permite dibujar hasta la parte de la figura que quepa, auqneu vaya a terminarse la partida

    if (this.isGameover()) {
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
      this.newFigures.push(this.random.getFigure(this.ctx, this.colDim, this.rowDim, false, this.allowLetters))
    }

    this.allowLetters = LETTERS
      .filter((type) => {
        return this.newFigures.map((figure) => figure.type).indexOf(type) === -1
      })

    if (this.isFirstFigure) {
      this.figure = this.newFigures[0]
      this.newFigures.forEach((newFigure) => this.prevFigures.push(newFigure))
    } else {
      this.figure = this.newFigures.shift()
      this.prevFigures.push(this.figure)
    }

    if (this.isFirstFigure) {
      this.panelFigure.render(
        this.newFigures[0].type,
        this.newFigures[0].color
      )
    } else {
      this.panelFigure.render(
        this.newFigures[this.newFigures.length - 1].type,
        this.newFigures[this.newFigures.length - 1].color
      )
    }

  }

}