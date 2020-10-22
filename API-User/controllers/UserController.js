
const User = require('../models/User')

class UserController {
    async index(req, res){
        const users = await User.findAll()

        return res.status(200).json(users)

    }

    async findUser(req, res){

        const {id} = req.params

        const users = await User.findById(id)

        if(!users) return res.status(404).json({msg: 'not found'})
        
        return res.status(200).json(users)

    }

    async updateUser(req, res){

        const {id} = req.params
        const {email, name, role} = req.body

        const user = await User.update(id, email, name, role)

        if(!user.status) return res.status(404).json({msg: user.msg})
        
        return res.status(200).json(user)

    }

    async delete(req, res){

        const {id } = req.params

        const user = await User.delete(id)

        if(!user.status){
            return res.status(404).json({msg: user.msg})
        }
        
        return res.status(400).json({msg: user.msg})

    }

    async create(req, res){
        const {name, email, password} = req.body

        if(!email) return res.status(400).json({msg: 'Email invalid'})


        var existEmail = await User.findEmail(email)


        if(existEmail) 
            return res.status(406).json({msg: 'email already exist'})


        await User.insertUser(name, email, password)
        
        return res.status(200).json({msg: 'OK'})

    }
}

module.exports= new UserController()