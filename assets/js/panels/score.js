class Score {
  constructor() {
    this.total = 0
    this.lines = 0
  }

  linesToScore(linePacks) {
    if (!linePacks.length) {
      return null
    }
    linePacks.forEach((pack) => {
      switch(pack) {
        case 1:
          this.total += 100
          break;
        case 2:
          this.total += 300
          break;
        case 3:
          this.total += 500
          break;
        case 4:
          this.total += 800
          break;
        default:
          this.total += 100          
      }
    })
    this.lines += linePacks.reduce((acc, curr) => acc + curr)
  }

  render() {
    document.getElementById('score-value').innerHTML = `${this.total.toLocaleString('de-DE')}`
    document.getElementById('lines-value').innerHTML = `${this.lines.toLocaleString('de-DE')}`
  }
}