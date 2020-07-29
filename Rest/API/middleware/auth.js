const jwt = require('jsonwebtoken')

const JWTSecret = 'fjwerfni4ohf839hfi3niovncin3ioir934gj4ojo'
module.exports = auth = (req, res, next)=>{
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token = bearer[1]

        jwt.verify(token, JWTSecret, (err, data)=>{
            if(err){
                res.status(401)
                res.json({err: 'token invalid'})
            }else{

                // criou duas variáveis para facilitar na busca
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                
                next()
            }
        })        



    }else{
        res.status(401)
        res.json({err: 'token invalid'})
    }

}