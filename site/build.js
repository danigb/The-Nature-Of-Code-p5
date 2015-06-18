
var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')

var ROOT = path.join(__dirname, '..')
var INDEX = path.join(__dirname, '..', 'index.html')
var INDEX_TEMPLATE = path.join(__dirname, 'index.html.handlebars')

var data = require('./data.json')
var chaptersByNum = {}
data.chapters.forEach(function (chapter) {
  chapter.examples = []
  chaptersByNum[chapter.num] = chapter
})

var match
var files = fs.readdirSync(ROOT)
files.forEach(function (file) {
  if ((match = /^(\d{1,2})\.(.*)$/.exec(file))) {
    chaptersByNum[match[1]].examples.push(match[2])
  }
})

var indexTemplate = handlebars.compile(fs.readFileSync(INDEX_TEMPLATE, 'utf-8'))
fs.writeFileSync(INDEX, indexTemplate(data))
