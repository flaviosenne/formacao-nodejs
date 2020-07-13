const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database/database')
const CategoriesController = require('./categories/CategoriesControlle')
const ArticlesController = require('./articles/ArticlesController')

const Article = require('./articles/Articles')
const Category = require('./categories/Category')
// View engine
app.set('view engine', 'ejs')

//Static
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// database
connection
.authenticate()
.then(() => {
        console.log('Conexão realizado com sucesso')
    }).catch(err => console.log(err))

    
    
app.use('/', CategoriesController)
app.use('/', ArticlesController)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => console.log('Server running'))