const jtw = require('jsonwebtoken')
const secret = 'oer423j 3tt35o0-5t5t 5t30-tgkv-=2'
module.exports = function(req, res, next){

    const authorization = req.headers['authorization']

    if(!authorization){
        return res.status(403).json({msg: 'unauthorization'})
    }
    
    const bearer = authorization.split(' ')
    const token = bearer[1]
    
    try{
        const decoded = jtw.verify(token, secret)
        if(decoded.role == 'admin') next()
        
        else{
            return res.status(403).json({msg: 'unauthorization'})
        }
    }
    catch(err){
        return res.status(403).json({msg: 'unauthorization'})

    }

}