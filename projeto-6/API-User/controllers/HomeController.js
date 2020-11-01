const connection = require('../database/connection')

class Test {
    index = (req, res) =>{
        res.send('oi')
    }
    async validate(req, res){
        res.json({msg: 'ok'})
    }
}
module.exports = new Test()