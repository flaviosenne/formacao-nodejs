const { userModel } = require("../model/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'alguma coisa bem dificil de decifrar'

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

    async login(req, res){
        const {email, password} = req.body

        let user = await userModel.findOne({email})

        if(!user) return res.status(403).json({errors: {email: 'Email não cadastrado'}})

        let matchers = await bcrypt.compare(password, user.password)

        if(!matchers) return res.status(403).json({errors: {password: 'Senha incorreta'}})

        jwt.sign({email}, secret, {expiresIn: '48h'}, (err, token) => {
            if(err){
                console.log(err)
                return res.status(500).json(null)
            }
            return res.status(200).json({token})
        })    
    }
}

module.exports = { UserController}