var radius = 64

function Mover (p) {
  this.location = p.createVector(p.random(p.width), p.random(p.height))
  this.velocity = p.createVector(0, 0)
  this.acceleration = p.createVector(0, 0)

  this.update = function () {
    this.velocity.add(this.acceleration)
    this.velocity.limit(10)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  this.applyForce = function (force) {
    this.acceleration.add(force)
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

new p5(function (p) {
  function wind (time) {
    // random wind:
    // return p.createVector(p.random(-1, 1), p.random(-1, 1))
    // peril wind:
    return p.createVector(p.noise(time) - 0.5, p.noise(time + 10000) - 0.5)
  }

  var mover = null
  var time = 0

  p.setup = function () {
    p.createCanvas(640, 360)
    mover = new Mover(p)
  }

  p.draw = function () {
    p.background(250)
    mover.applyForce(wind(time))
    mover.update()
    mover.checkEdges()
    mover.display()
    time += 0.05
  }
})
