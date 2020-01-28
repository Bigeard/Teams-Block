
/*
var pdfText = require('pdf-text')

var pathToPdf = __dirname + "/info.pdf"



pdfText(pathToPdf, function(err, chunks) {
    //chunks is an array of strings 
    //loosely corresponding to text objects within the pdf

    //for a more concrete example, view the test file in this repo
  })

  //or parse a buffer of pdf data
  //this is handy when you already have the pdf in memory
  //and don't want to write it to a temp file
  var fs = require('fs')
  var buffer = fs.readFileSync(pathToPdf)
  pdfText(buffer, function(err, chunks) {

  })
*/

  ////////////////////////////
console.log("test")
var _ = require('lodash')
var Parser = require('pdf3json')

//clear the pdf logger
require('util')._logN = function() { }

//given a path to a pdf
//turn it into a json structure
module.exports = function(path, cb) {
  console.log("module.exports")
  var parser = new Parser()
  parser.on('pdfParser_dataReady', function(result) {

    var text = []

    //get text on a particular page
    result.data.Pages.forEach(function(page) {
      var chunks = _(page.Texts).map('R').flatten().map('T').map(decodeURIComponent).value()
      text = text.concat(chunks)
    })

    parser.destroy()

    setImmediate(function() {
      cb(null, text)
    })
  })

  parser.on('pdfParser_dataError', function(err) {
    parser.destroy()
    cb(err)
  })
  if(path instanceof Buffer) {
    return parser.parseBuffer(path)
  }
  parser.loadPDF(path)
}

