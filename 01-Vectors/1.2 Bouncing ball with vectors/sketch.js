new p5(function (p) {
  var position, velocity

  p.setup = function () {
    p.createCanvas(640, 360)
    position = p.createVector(100, 100)
    velocity = p.createVector(2.5, 5)
  }

  p.draw = function () {
    p.background(250)

    position.add(velocity)

    if (position.x < 0 || position.x > p.width) {
      velocity.x = -1 * velocity.x
    }
    if (position.y < 0 || position.y > p.height) {
      velocity.y = -1 * velocity.y
    }

    p.stroke(0)
    p.strokeWeight(2)
    p.fill(127)
    p.ellipse(position.x, position.y, 48, 48)
  }
})
