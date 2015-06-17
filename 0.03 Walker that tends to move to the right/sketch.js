function Walker (p) {
  this.x = p.width / 2
  this.y = p.height / 2

  this.display = function () {
    p.stroke(0)
    p.point(this.x, this.y)
  }

  this.step = function () {
    var r = p.random(1)

    if (r < 0.4) {
      this.x++
    } else if (r < 0.6) {
      this.x--
    } else if (r < 0.8) {
      this.y++
    } else {
      this.y--
    }
  }
}

new p5(function (p) {
  var w

  p.setup = function () {
    p.createCanvas(640, 360)
    p.background(250)
    w = new Walker(p)
  }

  p.draw = function () {
    w.step()
    w.display()
  }
})
