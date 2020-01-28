const bookJSON = []


function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }

    return pageData.getTextContent(render_options)
        .then(function (textContent) {
            let text = '';
            for (let item of textContent.items) {
                if (!isNaN(item.str) && parseInt(item.str)) {
                    bookJSON.push({
                        "text": text,
                        "number": parseInt(item.str)
                    })
                } else {
                    text += item.str;
                }
            }
            return;
        });
}