const fs = require('fs')
const util = require('util')

class Writer {

    constructor(){
        this.writer = util.promisify(fs.writeFile)
    }

    async Write(filaName, data){
        try{
            await this.writer(filaName, data)
            return true
        }catch(err){
            return false
        }
    }

}
module.exports = Writer