const connection = require('../database/connection')
const User = require('./User')

class PasswordToken {

    async create(email){
        const user = await User.findByEmail(email)

        if(!user){
            return {status: false, msg: 'email not found'}
        }
        
        try{
            const token = Date.now()

            await connection.insert({
                user_id: user.id,
                used: 0,
                token
            }).table('passwordToken')
            
            return {status: true, msg: 'ok', token}
        }
        catch(err){
            console.log(err)
            return {status: false, msg: 'error server'}
        }
        
    }

    async validation(token){

        const result = await connection.select()
        .where({token: token}).table('passwordToken')

        try{

            if(!result.length > 0) return {status: false}
            
            const tk = result[0]
            
            if(tk.used) return {status: false}
        
            return {status: true, token: tk}
        
        }
        catch(err){
            console.log(err)
            return {status: false}
        }

    }

    async setUsed(token){

        await connection.update({used: 1}).where({token: token}).table('passwordToken')
    }

}

module.exports = new PasswordToken()