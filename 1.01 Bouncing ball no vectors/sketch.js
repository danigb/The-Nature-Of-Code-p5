new p5(function (p) {
  var x = 100
  var y = 100
  var xspeed = 2.5
  var yspeed = 2

  p.setup = function () {
    p.createCanvas(640, 360)
  }

  p.draw = function () {
    p.background(250)
    x += xspeed
    y += yspeed

    if (x < 0 || x > p.width) xspeed *= -1
    if (y < 0 || y > p.height) yspeed *= -1

    p.stroke(0)
    p.strokeWeight(2)
    p.fill(127)
    p.ellipse(x, y, 48, 48)
  }
})
