const app = require('express').Router()
const DB = require('../db/array')
const jwt = require('jsonwebtoken')

const JWTSecret = 'fjwerfni4ohf839hfi3niovncin3ioir934gj4ojo'


app.post('/auth', (req, res) => {
    const { email, pass } = req.body

    if (email != undefined) {

        const user = DB.users.find(user => user.email == email)

        if (user) {
            if (user.pass == pass) {

                // payload
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: 'failed in generate token' })
                    } else {
                        res.status(200)
                        res.json({ token: token })
                    }
                })
            }
            else {
                res.status(401)
                res.json({ err: 'unauthorization' })

            }



        } else {
            res.status(404)
            res.json({ err: 'user not found' })
        }

    } else {
        res.status(400)
        res.json({ err: 'email invalid' })
    }

})


module.exports = app