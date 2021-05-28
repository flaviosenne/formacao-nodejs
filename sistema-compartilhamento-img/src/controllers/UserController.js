const { userModel } = require("../model/User")

class UserController {
    async save(req, res) {
        const {name, email, password} = req.body
        
        try{

            const user = new userModel({name, email, password})
            
            await user.save()
            
            res.status(201).json({email})
        }catch(err){
            res.sendStatus(500)
        }
    }
}

module.exports = { UserController}