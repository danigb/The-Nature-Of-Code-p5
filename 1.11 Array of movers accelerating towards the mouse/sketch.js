var radius = 64

function Mover (p) {
  this.location = p.createVector(p.random(p.width), p.random(p.height))
  this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))

  this.update = function () {
    var mouse = p.createVector(p.mouseX, p.mouseY)
    var acceleration = p5.Vector.sub(mouse, this.location).normalize().mult(0.5)
    this.velocity.add(acceleration)
    this.velocity.limit(5)
    this.location.add(this.velocity)
  }

  this.display = function () {
    p.stroke(0)
    p.fill(175)
    p.ellipse(this.location.x, this.location.y, radius, radius)
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

var total = 20
new p5(function (p) {
  var movers = []

  p.setup = function () {
    p.createCanvas(640, 360)
    for (var i = 0; i < total; i++) {
      movers[i] = new Mover(p)
    }
  }

  p.draw = function () {
    p.background(250)
    for (var i = 0; i < total; i++) {
      movers[i].update()
      movers[i].checkEdges()
      movers[i].display()
    }
  }
})
