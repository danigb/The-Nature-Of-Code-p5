function Mover (p) {
  this.location = p.createVector(p.random(p.width), p.random(p.height))
  this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))

  this.update = function () {
    this.location.add(this.velocity)
  }

  this.display = function () {
    p.stroke(0)
    p.fill(175)
    p.ellipse(this.location.x, this.location.y, 16, 16)
  }

  this.checkEdges = function () {
    this.location.x = inBounds(this.location.x, 0, p.width)
    this.location.y = inBounds(this.location.y, 0, p.height)
  }

  function inBounds (value, min, max) {
    if (value < min) {
      return max
    } else if (value > max) {
      return min
    } else {
      return value
    }
  }
}

new p5(function (p) {
  var mover

  p.setup = function () {
    p.createCanvas(640, 360)
    mover = new Mover(p)
  }

  p.draw = function () {
    p.background(250)
    mover.update()
    mover.checkEdges()
    mover.display()
  }
})
