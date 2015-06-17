function Walker (p) {
  this.x = p.width / 2
  this.y = p.height / 2

  this.display = function () {
    p.stroke(0)
    p.point(this.x, this.y)
  }

  this.step = function () {
    this.x += p.floor(p.random(3)) - 1
    this.y += p.floor(p.random(3)) - 1
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
