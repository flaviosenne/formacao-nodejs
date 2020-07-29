const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



module.exports = app