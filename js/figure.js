class Figure {
  constructor(ctx, pattern) {
    this.pattern = pattern
    this.construction = [ ]
  }

  draw() {
    switch (pattern) {
      case 'square':
        
        break;
      case 'row':
        for(let index = 0; index < 4; index++) {
          this.construction.push(square)
        }
        break;
    }
  }

  move() {
    switch (pattern) {
      case 'square':

        break;
    }
  }
}