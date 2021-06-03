const { userModel } = require("../model/User")
const bcrypt = require('bcrypt')

class UserController {
    async save(req, res) {
        const {name, email, password} = req.body
        
        if(name == '' || email == '' || password == ''){
            return res.status(400).json(null)
        }
        try{
            let user = await userModel.findOne({email})
            
            if(user) return res.status(400).json({error:"Email já cadastrado"})
        
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            user = new userModel({name, email, password: hash})
            
            await user.save()
            
            return res.status(201).json({email})
        }catch(err){
            res.status(500).json(null)
        }
    }
    async delete(req, res) {
        let user = await userModel.deleteOne({email: req.params.email})
        return res.status(204).json(null)
    }
}

module.exports = { UserController}