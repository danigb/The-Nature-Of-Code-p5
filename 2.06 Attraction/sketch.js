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
    p.stroke(3)
    p.strokeWeight(2)
    p.fill('rgba(0,0,0,0.3)')
    p.ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
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
    p.strokeWeight(4)
    p.stroke(0)
    if (this.dragging) {
      p.fill(50)
    } else if (this.rollover) {
      p.fill(150)
    } else {
      p.fill(255)
    }
    p.ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2)
  }


  function Canvas (width, height) {
    var mover = new Mover(400, 50, 1)
    mover.velocity = p.createVector(1, 1)
    var attractor = new Attractor(width / 2, height / 2, 20)
    var drag = draggable(attractor)

    p.setup = function () {
      p.createCanvas(width, height)
    }
    p.draw = function () {
      p.background(200)
      var force = attractor.calculateAttraction(mover)
      mover.applyForce(force)
      mover.update()

      attractor.display()
      mover.display()
    }
    p.mouseMoved = function () { drag.mouseMoved() }
    p.mousePressed = function () { drag.mousePressed() }
    p.mouseDragged = function () { drag.mouseDragged() }
    p.mouseReleased = function () { drag.mouseReleased() }
  }

  function draggable (obj) {
    obj.rollover = false
    obj.dragging = false

    var drag = { offset: p.createVector(0, 0) }
    drag.mouseMoved = function () {
      var dist = p.dist(p.mouseX, p.mouseY, obj.position.x, obj.position.y)
      obj.rollover = dist < obj.mass
    }
    drag.mousePressed = function () {
      if (obj.rollover) {
        obj.dragging = true
        drag.offset.x = obj.position.x - p.mouseX
        drag.offset.y = obj.position.y - p.mouseY
      }
    }
    drag.mouseDragged = function () {
      if (obj.dragging) {
        obj.position.x = p.mouseX + drag.offset.x
        obj.position.y = p.mouseY + drag.offset.y
      }
    }
    drag.mouseReleased = function () {
      obj.dragging = false
    }
    return drag
  }

  Canvas(640, 360)
})
