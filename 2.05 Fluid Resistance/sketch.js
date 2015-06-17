new p5(function (p) {
  function Mover (x, y, mass) {
    this.position = p.createVector(x, y)
    this.velocity = p.createVector(0, 0)
    this.acceleration = p.createVector(0, 0)
    this.mass = mass
    this.radius = 8 * this.mass
  }

  Mover.prototype.rect = function () {
    var x = this.position.x
    var y = this.position.y
    var r = this.radius
    return { left: x - r, top: y - r, right: x + r, bottom: y + r }
  }

  Mover.prototype.update = function () {
    this.velocity.add(this.acceleration)
    this.velocity.limit(10)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  Mover.prototype.applyForce = function (force) {
    var weightedForce = p5.Vector.div(force, this.mass)
    this.acceleration.add(weightedForce)
  }

  Mover.prototype.display = function () {
    p.stroke(3)
    p.fill('rgba(0,0,0,0.3)')
    p.ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
  }

  Mover.prototype.checkEdges = function () {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x = -1 * this.velocity.x
    }

    if (this.position.y > height) {
      this.velocity.y = -1 * this.velocity.y
      this.position.y = height
    }
  }

  function Liquid (x, y, width, height, coef) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.coef = coef
    this.rect = { left: x, top: y, right: x + width, bottom: y + height }
  }
  Liquid.prototype.display = function () {
    p.noStroke()
    p.fill('rgba(0,0,200,0.3)')
    p.rect(this.x, this.y, this.width, this.height)
  }
  Liquid.prototype.isInside = function (x, y, width, height) {
    return x + width > this.x && x < this.x + this.width &&
      y + height > this.y && y < this.y + this.height
  }
  Liquid.prototype.getForce = function (mover) {
    var speed = mover.velocity.mag()
    var dragMagnitude = this.coef * speed * speed
    var force = mover.velocity.copy().mult(-1).normalize().mult(dragMagnitude)
    return force
  }

  var width = 640
  var height = 360
  var total = 30
  var movers = []
  var liquid = null

  var wind = function () {
    return p.createVector(0.01, 0)
  }
  var gravity = function (mover) {
    return p.createVector(0, 0.1 * mover.mass)
  }

  function isOverlapping (r1, r2) {
    return !(r2.left > r1.right || r2.right < r1.left ||
      r2.top > r1.bottom || r2.bottom < r1.top)
  }

  p.setup = function () {
    p.createCanvas(width, height)
    for (var i = 0; i < total; i++) {
      movers.push(new Mover(i * 20, 0, p.random(0.1, 5)))
    }
    liquid = new Liquid(0, height / 2, width, height / 2, 0.005)
    // liquid = new Liquid(width / 2, 0, 40, height, 0.005)
  }

  p.draw = function () {
    p.background(250)
    liquid.display()
    movers.forEach(function (m) {
      m.applyForce(gravity(m))
      if (isOverlapping(m.rect(), liquid.rect)) {
        m.applyForce(liquid.getForce(m))
      } else {
        m.applyForce(wind())
      }
      m.update()
      m.checkEdges()
      m.display()
    })
  }
})
