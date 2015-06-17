new p5(function (p) {

  function Mover (x, y, mass) {
    this.position = p.createVector(x, y)
    this.velocity = p.createVector(0, 0)
    this.acceleration = p.createVector(0, 0)
    this.mass = mass

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
      p.stroke(3)
      p.fill('rgba(0,0,0,0.3)')
      var radius = 16 * this.mass
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
  var total = 100
  var movers = []
  var wind = p.createVector(0.01, 0)
  var gravity = p.createVector(0, 0.1)

  p.setup = function () {
    p.createCanvas(width, height)
    for (var i = 0; i < total; i++) {
      movers[i] = new Mover(0, 0, p.random(0.1, 5))
    }
  }

  p.draw = function () {
    p.background(250)
    for (var i = 0; i < total; i++) {
      movers[i].applyForce(wind)
      movers[i].applyForce(gravity)
      movers[i].update()
      movers[i].checkEdges()
      movers[i].display()
    }
  }
})
