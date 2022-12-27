class Random {
    constructor() {
      this.figure = null
      this.color = null
    }
  
    getFigure(ctx, colDim, rowDim, isPanel = false, letters = [73, 74, 76, 79, 83, 84, 90], color) {
      if (!color) {
        color = this.getColor()
      }
      const index = Math.floor(Math.random() * letters.length)
      switch (letters[index]) {
        case 73:
          this.figure = new I_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 74:
          this.figure = new J_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 76:
          this.figure = new L_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 79:
          this.figure = new O_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 83:
          this.figure = new S_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 84:
          this.figure = new T_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
        case 90:
          this.figure = new Z_Figure(ctx, colDim, rowDim, isPanel, letters[index], color)
          break;
      }
      return this.figure
    }
  
    getColor() {
      const index = Math.floor(Math.random() * PALETTE_COLORS.length)
      return PALETTE_COLORS[index]
    }
  
  }
  