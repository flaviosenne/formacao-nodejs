const connection = require('../database/connection')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)
class User{
    async findAll(){
        try{

            const result = await connection.select('id', 'name', 'email', 'role').table('user')

            return result
        }
        catch(err){
            console.log(err)
            return err
        }

    }

    async findById(id){
        try{

            const result = await connection.select('id', 'name', 'email', 'role')
            .where({id: id})
            .table('user')
            .first()

            return result
        }
        catch(err){
            console.log(err)
            return err
        }

    }
    async insertUser(name, email, password){
 
        if(!password){
            password = '' 
        }

            const hash = await bcrypt.hashSync(password, salt)

        try{

            await connection.insert({
                name, email, password: hash, role: 0
            }).table('user')
        }

        catch(err){
            console.log(err)
        }
        
    }

    async findEmail(email){
        try{
            const result = await connection.select().from('user').where({email: email})
        
            if(result.length > 0){
                return true
            }else{

                return false
            }
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    async update(id, email, Name, Role){
        const user = await this.findById(id)

        if(user){

            var {name, role} = user

            
            if(!email){
                return {status: false, msg: 'email invalid'}
            }
            if(email == user.email){
                return {status: false, msg: 'email already ultilized'}    
            }
            
            const existEmail = await this.findEmail(email)
            
            if(existEmail){
                return {status: false, msg: 'email already exist'}    
            }


            await 
            connection.update({email: email, 
                name: !Name ? name: Name, 
                role: !Role ? role: Role})
            .where("id", id).table('user')
            
            return {status: true, msg: 'user updated'}

        }
        return {status: false, msg: 'user not found'}
    }

    async delete(id){

        const user = await this.findById(id)

        if(!user){
            return {status: false, msg: 'User not found'}
        }
        
        try{
            
            await connection.delete().where({id: id}).table('user')
            
            return {status: true, msg: 'User deleted'}
        }
        
        catch(err){
            return {status: false, msg: 'Error serve'}
            
        }


    }

}

module.exports = new User()