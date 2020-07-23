const Reader = require('./Rader')
const Processor = require('./Processor')
const Table = require('./Table')
const HtmlParser = require('./HtmlParser')
const Write = require('./Writer')
const PDFWrite = require('./PDFWriter')

var leitor = new Reader()

var escritor = new Write()
async function main(){

    var datas = await leitor.Read('./user.csv')

    var datasProcess = Processor.Process(datas)

    var users = new Table(datasProcess)

 
    var html = await HtmlParser.Parse(users)

    escritor.Write(Date.now()+'.html', html)
    PDFWrite.WritePDF(Date.now()+'.PDF', html)
}

main()