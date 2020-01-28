const fs = require('fs');
const path = require('path')
const pdf = require("pdf-parse");
const sha256 = require("sha256");
const bookJSON = [];

function render_page(pageData) {
  //check documents https://mozilla.github.io/pdf.js/
  let render_options = {
    //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
    normalizeWhitespace: false,
    //do not attempt to combine same line TextItem's. The default value is `false`.
    disableCombineTextItems: false
  };

  return pageData.getTextContent(render_options).then(function(textContent) {
    let text = "";
    for (let item of textContent.items) {
      if (!isNaN(item.str) && parseInt(item.str)) {
        bookJSON.push({
          text: text,
          number: parseInt(item.str),
          hash: String(sha256(text))
        });
      } else {
        text += item.str;
      }
    }
    return;
  });
}



let options = {
  pagerender: render_page
};

let dataBuffer = fs.readFileSync(path.join(__dirname, "book/Bel_Ami.pdf"));
pdf(dataBuffer, options)
  .then(function(data) {
    console.log(bookJSON[5]);
    console.log(bookJSON[6]);
    console.log(bookJSON[7]);
    console.log(bookJSON[8]);
    console.log(bookJSON[9]);
    for(let i = 1; i<bookJSON.length; i++) {
        let pages = bookJSON[a].hash + bookJSON[b].hash + bookJSON[c].hash + bookJSON[d].hash + bookJSON[e].hash;
        let hash_block = sha256(pages);
        a = a + 5;
        b = b + 5;
        c = c + 5;
        d = d + 5;
        e = e + 5;
        console.log(i)
        console.log(hash_block)
    } 
    
    
  })
  .catch(function(err) {
    console.log(err);
  });


function sha(txt) {
     return sha256(txt.text);

     
}






let a = 0;
let b = 1;
let c = 2;
let d = 3;
let e = 4;

