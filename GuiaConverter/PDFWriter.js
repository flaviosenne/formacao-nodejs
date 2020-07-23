const pdf = require('html-pdf')

module.exports = class PDFWriter {

    static WritePDF(fileName, html){
        pdf.create(html, {}).toFile(fileName, err => {})
    }
}
