new p5(function (p) {

  function Mover (x, y, mass) {
    this.position = p.createVector(x, y)
    this.velocity = p.createVector(0, 0)
    this.acceleration = p.createVector(0, 0)
    this.mass = mass
    this.angle = 0
    this.aVelocity = 0

    this.update = function () {
      this.velocity.add(this.acceleration)
      this.velocity.limit(10)
      this.position.add(this.velocity)
      this.acceleration.mult(0)

      this.aVelocity += this.aAcceleration
      this.aVelocity = p.constrain(this.aVelocity, -0.05, 0.05)
      this.angle += this.aVelocity
    }

    this.applyForce = function (force) {
      var weightedForce = p5.Vector.div(force, this.mass)
      this.acceleration.add(weightedForce)
      this.aAcceleration = this.acceleration.x / 100
    }

    this.display = function () {
      p.stroke(3)
      p.fill('rgba(0,0,0,0.3)')
      p.push()
      p.translate(this.position.x, this.position.y)
      p.rotate(this.angle)
      var radius = 16 * this.mass
      p.rect(0, 0, radius, radius)
      p.pop()
    }

    this.checkEdges = function () {
      if (this.position.x < 0 || this.position.x > width) {
        this.velocity.x = -1 * this.velocity.x
      }

      if (this.position.y > height) {
        this.velocity.y = -1 * this.velocity.y
        this.position.y = height
      }
    }
  }

  var width = 640
  var height = 360
  var total = 30
  var movers = []

  p.setup = function () {
    p.createCanvas(width, height)
    for (var i = 0; i < total; i++) {
      movers[i] = new Mover(p.random(0, width), p.random(0, height), p.random(0.1, 5))
      movers[i].applyForce(p.createVector(p.random(-2, 2), p.random(-2, 2)))
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
