class PanelFigure {
  constructor() {
    this.container = document.getElementById('next-figure-value')

    this.colDim = 4
    this.rowDim = 4

    this.setCanvas()
  }

  setCanvas(){
    const canvas = document.querySelector('#panel-figure')
    canvas.setAttribute('width', this.container.clientWidth -10)
    canvas.setAttribute('height', this.container.clientWidth - 10)
    this.ctx = canvas.getContext('2d')
    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientWidth / this.rowDim
  }

  showNextFigure(type) {
    // console.log('showNextFigure type ', type )
    this.createFigure(type)
    this.clear()
    this.figure.draw()
  }

  createFigure(type) {
    let figure
    switch (type) {
      case 'I_Figure':
        figure = new I_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        //figure.setRotation()
        break;
      case 'J_Figure':
        figure = new J_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
      case 'L_Figure':
        figure = new L_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
      case 'O_Figure':
        figure = new O_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
      case 'S_Figure':
        figure = new S_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
      case 'T_Figure':
        figure = new T_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
      case 'Z_Figure':
        figure = new Z_Figure(this.ctx, this.colDim, this.rowDim, true, type)
        break;
    }
    this.figure = figure
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }


}