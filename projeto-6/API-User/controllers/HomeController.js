const connection = require('../database/connection')

class Test {
    index = (req, res) =>{
        res.send('oi')
    }
}
module.exports = new Test()