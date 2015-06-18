new p5(function (p) {
  var width = 640
  var height = 360
  var angle = 0
  var angularVelocity = 0
  var angularAcceleration = 0.001

  p.setup = function () {
    p.createCanvas(width, height)
  }

  p.draw = function () {
    p.background(250)

    p.fill(175)
    p.stroke(0)
    p.strokeWeight(2)

    p.translate(width / 2, height / 2)
    p.rotate(angle)

    p.line(-60, 0, 60, 0)
    p.ellipse(60, 0, 16, 16)
    p.ellipse(-60, 0, 16, 16)

    angle += angularVelocity
    angularVelocity += angularAcceleration
  }
})
