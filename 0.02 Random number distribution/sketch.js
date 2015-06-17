var total = 20

new p5(function (p) {
  var randomCounts = []

  p.setup = function () {
    p.createCanvas(640, 360)
    for (var i = 0; i < total; i++) {
      randomCounts[i] = 0
    }
  }

  p.draw = function () {
    p.background(250)

    var index = p.floor(p.random(total))
    randomCounts[index]++

    p.stroke(0)
    p.fill(100)
    var width = p.width / total
    for (var i = 0; i < total; i++) {
      p.rect(i * width, p.height - randomCounts[i], width - 1, randomCounts[i])
    }
  }
})
