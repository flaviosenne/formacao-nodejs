const { userModel } = require("../model/User")

class UserController {
    async save(req, res) {
        const {name, email, password} = req.body
        
        try{

            if(name == '' || email == '' || password == ''){
                return res.status(400).json(null)
            }
            const user = new userModel({name, email, password})
            
            await user.save()
            
            return res.status(201).json({email})
        }catch(err){
            res.status(500).json(null)
        }
    }
}

module.exports = { UserController}