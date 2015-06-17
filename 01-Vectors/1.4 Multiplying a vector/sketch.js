new p5(function (p) {
  p.setup = function () {
    p.createCanvas(640, 360)
  }

  p.draw = function () {
    p.background(250)
    var mouse = p.createVector(p.mouseX, p.mouseY)
    var center = p.createVector(p.width / 2, p.height / 2)

    mouse.sub(center)
    mouse.mult(0.5)

    p.translate(p.width / 2, p.height / 2)
    p.strokeWeight(4)
    p.line(0, 0, mouse.x, mouse.y)
  }
})
