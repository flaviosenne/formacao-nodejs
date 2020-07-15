const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('./User.js')

router.get('/admin/users', (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users})
    })
})


router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
    const { email, password} = req.body

    
    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined){

            res.redirect('/admin/users/create')
        }
        else{
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password)
        
            User.create({
            email: email,
                password: hash
            }).then(() => {
                res.redirect('/')
                
            }).catch(err => res.redirect('/'))
        }
    })
    

})

router.get('/login', (req, res) => {
    res.render('admin/users/login')
})

router.post('/authenticate', (req, res) => {
    const { email, password} = req.body

    console.log(req.body)

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined){
            const correct = bcrypt.compareSync(password, user.password)

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                }
                res.redirect('/admin/articles')

            }else{

                res.redirect('/login')
            }

        }else{
            res.redirect('/login')
        }
    })

})

router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})
module.exports = router