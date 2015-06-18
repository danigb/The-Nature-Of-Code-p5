
var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')

var ROOT = path.join(__dirname, '..')
var INDEX = path.join(__dirname, '..', 'index.html')
var INDEX_TEMPLATE = path.join(__dirname, 'index.html.handlebars')

var files = fs.readdirSync(ROOT)

var chapters = {
  '0': { num: '0', title: 'Introduction', examples: []},
  '1': { num: '1', title: 'Vectors', examples: []},
  '2': { num: '2', title: 'Forces', examples: []},
  '3': { num: '3', title: 'Oscillation', examples: []},
  '4': { num: '4', title: 'Particle systems', examples: []},
  '5': { num: '5', title: 'Physics libraries', examples: []},
  '6': { num: '6', title: 'Autonomous agents', examples: []},
  '7': { num: '7', title: 'Cellular automata', examples: []},
  '8': { num: '8', title: 'Fractals', examples: []},
  '9': { num: '9', title: 'The evolution of code', examples: []},
  '10': { num: '10', title: 'Neural networks', examples: []}
}

var match
files.forEach(function (file) {
  if ((match = /^(\d{1,2})\.(.*)$/.exec(file))) {
    chapters[match[1]].examples.push(match[2])
  }
})

var indexTemplate = handlebars.compile(fs.readFileSync(INDEX_TEMPLATE, 'utf-8'))
fs.writeFileSync(INDEX, indexTemplate({ chapters: chapters }))
