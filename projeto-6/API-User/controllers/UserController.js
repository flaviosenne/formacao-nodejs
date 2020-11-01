
const User = require('../models/User')
const PasswordController = require('../models/PasswordToken')
const PasswordToken = require('../models/PasswordToken')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const secret = 'oer423j 3tt35o0-5t5t 5t30-tgkv-=2'
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

    async recoveryPassword(req, res){
        const { email} = req.body

        const result = await PasswordController.create(email)

        if(!result.status){
            return res.status(404).json(result.msg)
        }

        return res.status(200).json(result.token)
    }

    async changePassword(req, res){
        const {token, newPassword} = req.body

        const isToken = await PasswordToken.validation(token)

        if(!isToken.status) return res.status(406).json({msg: 'token invalid'})

        await User.changePassword(newPassword, isToken.token.user_id, isToken.token.token)

        return res.status(200).json({msg: 'password updated'})
        
    }

    async login(req, res){
        const {email, password}= req.body

        const user = await User.findByEmail(email)

        if(!user) return res.status(400).json({msg: 'invalid credentials'})

        const pass = await bcrypt.compareSync(password, user.password)

        if(!pass) return res.status(400).json({msg: 'invalid credentials'})
        
        const token = jwt.sign({email: user.email, role: user.role}, secret)

        return res.status(200).json({token})
    }

}

module.exports= new UserController()