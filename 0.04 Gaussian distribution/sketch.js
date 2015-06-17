new p5(function (p) {

  p.setup = function () {
    p.createCanvas(640, 360)
    p.background(250)
  }

  p.draw = function () {
    var x = p.floor(p.randomGaussian(320, 60))
    console.log(x)
    p.noStroke()
    p.fill('rgba(0,0,0,0.05)')
    p.ellipse(x, 180, 32, 32)
  }
})
