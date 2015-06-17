function Mover (p) {
  this.position = p.createVector(0, 40)
  this.velocity = p.createVector(0, 0)
  this.acceleration = p.createVector(0, 0)
  this.mass = 1

  this.update = function () {
    this.velocity.add(this.acceleration)
    this.velocity.limit(10)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  this.applyForce = function (force) {
    var weightedForce = p5.Vector.div(force, this.mass)
    this.acceleration.add(weightedForce)
  }

  this.display = function () {
    p.stroke(0)
    p.fill(175)
    var radius = 64 * this.mass
    p.ellipse(this.position.x, this.position.y, radius, radius)
  }

  this.checkEdges = function () {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x = -1 * this.velocity.x
    }

    if (this.position.y > height) {
      this.velocity.y = -1 * this.velocity.y
    }
  }
}

var width = 640
var height = 360

new p5(function (p) {
  var mover = null
  var wind = p.createVector(0.01, 0)
  var gravity = p.createVector(0, 0.1)

  p.setup = function () {
    p.createCanvas(width, height)
    mover = new Mover(p)
  }

  p.draw = function () {
    p.background(250)
    mover.applyForce(wind)
    mover.applyForce(gravity)
    mover.update()
    mover.checkEdges()
    mover.display()
  }
})
