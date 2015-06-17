var width = 640
var height = 360
var factor = 0.07

new p5(function (p) {
  var y = 0

  p.setup = function () {
    p.createCanvas(width, height)
    p.background(250)
  }

  p.draw = function () {
    for (var x = 0; x < width; x++) {
      var bright = p.map(p.noise(x * factor, y * factor), 0, 1, 0, 255)
      p.stroke(p.color(bright))
      p.point(x, y)
    }
    y++

    if (y > height) p.noLoop()
  }
})
