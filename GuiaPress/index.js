const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database/database')
const CategoriesController = require('./categories/CategoriesControlle')
const ArticlesController = require('./articles/ArticlesController')

const Article = require('./articles/Articles')
const Category = require('./categories/Category')
const Articles = require('./articles/Articles')
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
    Articles.findAll({order: [['id', 'desc']]}).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories})

        })

    })
})

app.get('/:slug', (req, res) => {
    const {slug} = req.params
    Articles.findOne({
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