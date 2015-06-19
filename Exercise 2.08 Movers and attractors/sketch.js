new p5(function (p) {
  function Mover (x, y, mass) {
    this.position = p.createVector(x, y)
    this.velocity = p.createVector(0, 0)
    this.acceleration = p.createVector(0, 0)
    this.mass = mass
    this.radius = 8 * this.mass
  }

  Mover.prototype.applyForce = function (force) {
    var weightedForce = p5.Vector.div(force, this.mass)
    this.acceleration.add(weightedForce)
  }

  Mover.prototype.update = function () {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  Mover.prototype.display = function () {
    p.point(this.position.x, this.position.y)
  }

  function Attractor (x, y, mass) {
    this.position = p.createVector(x, y)
    this.mass = mass
    this.G = 1
  }

  Attractor.prototype.calculateAttraction = function (mover) {
    var force = p5.Vector.sub(this.position, mover.position)
    var distance = force.mag()
    distance = p.constrain(distance, 5, 25)
    force.normalize()
    var strength = (this.G * this.mass * mover.mass) / (distance * distance)
    force.mult(strength)
    return force
  }

  Attractor.prototype.display = function () {
    p.ellipseMode(p.CENTER)
    if (this.dragging) {
      p.fill(50)
    } else if (this.rollover) {
      p.fill(150)
    } else {
      p.fill(255)
    }
    p.ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2)
  }

  function generate (times, generator) {
    var array = []
    while (times--) array.push(generator())
    return array
  }

  function Canvas (width, height) {
    var movers = generate(50, function () {
      var mover = new Mover(p.random(width), p.random(height), p.random(0.25, 1.5))
      mover.velocity = p.createVector(p.random(), p.random())
      return mover
    })
    var attractors = generate(10, function () {
      return new Attractor(p.random(width) / 2, p.random(height) / 2, p.random(5, 10))
    })

    p.setup = function () {
      p.createCanvas(width, height)
      p.colorMode(p.HSB)
    }
    var time = 50
    p.draw = function () {

      var force
      movers.forEach(function (m) {
        attractors.forEach(function (a) {
          force = a.calculateAttraction(m)
          m.applyForce(force)
        })
        m.update()
        p.stroke(p.noise(time) * 360, 50, 100)
        time += 1
        m.display()
      })
    }

    var running = true
    p.mousePressed = function () {
      running ? p.noLoop() : p.loop()
      running = !running
    }
  }

  Canvas(640, 360)
})
