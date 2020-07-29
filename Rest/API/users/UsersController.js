const app = require('express').Router()


    app.get('/auth', (req, res)=> {
        res.send('oi')
    })


module.exports = app