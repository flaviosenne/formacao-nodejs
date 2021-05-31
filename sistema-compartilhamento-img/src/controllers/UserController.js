const { userModel } = require("../model/User")

class UserController {
    async save(req, res) {
        const {name, email, password} = req.body
        
        if(name == '' || email == '' || password == ''){
            return res.status(400).json(null)
        }
        try{
            let user = await userModel.findOne({email})
            
            if(user) return res.status(400).json({error:"Email já cadastrado"})
        
            user = new userModel({name, email, password})
            
            await user.save()
            
            return res.status(201).json({email})
        }catch(err){
            res.status(500).json(null)
        }
    }
}

module.exports = { UserController}