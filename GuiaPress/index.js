const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const session = require('express-session')

const app = express()

//sessions

//Redis == banco de dados para salvar sessões
app.use(session({
    secret: 'rifjienfiotg934jf93jffij59fjddex',
    cookie: {
        maxAge: 300000000 // milisegundos 
    }
}))
// imports controllers
const CategoriesController = require('./categories/CategoriesControlle')
const ArticlesController = require('./articles/ArticlesController')
const UsersController = require('./user/UserController')

// imports models
const Article = require('./articles/Articles')
const User = require('./user/User')
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

    
    
// route controllers  


app.use('/', CategoriesController)
app.use('/', ArticlesController)
app.use('/', UsersController)



// routes index
app.get('/', (req, res) => {
    Article.findAll(
        {
            order: [['id', 'desc']],
            limit: 4
        })
        .then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories})

        })

    })
})

app.get('/:slug', (req, res) => {
    const {slug} = req.params
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        console.log(article)
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories})
            })
        }else{
            res.redirect('/')
            
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    const {slug} = req.params

    Category.findOne({
        where: {
            slug: slug
        },
        // join de Article
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                
                res.render('index', {articles: category.artigos, categories: categories})
            })

        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})
app.listen(8080, () => console.log('Server running'))