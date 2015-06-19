
var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')

var ROOT = path.join(__dirname, '..')
var INDEX = path.join(__dirname, '..', 'index.html')
var INDEX_TEMPLATE = path.join(__dirname, 'index.html.handlebars')

var data = require('./data.json')
var chaptersByNum = {}
data.chapters.forEach(function (chapter) {
  chapter.sketches = []
  chaptersByNum[chapter.num] = chapter
})

var match
var files = fs.readdirSync(ROOT)
files.forEach(function (file) {
  if ((match = /^(\w*)\s*(\d{1,2})\.(.*)$/.exec(file))) {
    chaptersByNum[match[2]].sketches.push(match[0])
  }
})

var indexTemplate = handlebars.compile(fs.readFileSync(INDEX_TEMPLATE, 'utf-8'))
fs.writeFileSync(INDEX, indexTemplate(data))
