const router = require('express').Router()
const Category = require('../categories/Category')
const Articles = require('./Articles')
const slugify  = require('slugify')

router.get('/admin/articles', (req, res)=> {
    Articles.findAll({
        // relacionamento de Categorias
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/index', {articles: articles})
    })
})
router.get('/admin/articles/new', (req, res)=> {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})

    })
})
router.post('/articles/save', (req, res) => {
    const {title, body, category} = req.body

    Articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoriumId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})
router.post('/articles/delete', (req, res) => {
    const id = req.body.id
   
    if(id != undefined){
        if(!isNaN(id)){

            Articles.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles') 
            })

        }else{
           res.redirect('/admin/articles') 
        }
    }else{
        res.redirect('/admin/articles') 

    }
})

router.get('/admin/articles/edit/:id', (req, res) => {
    const {id} = req.params

    Articles.findByPk(id).then(article => {
        console.log(article)
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {article: article, categories: categories})

            })
        }else{
            res.redirect('/')

        }

    }).catch(err => {
        res.redirect('/')
    })
})

router.post('/articles/update', (req, res) => {
    const {id, title, body, category} = req.body
    console.log(Articles.update())
    Articles.update({
        title: title,
        body: body,
        categoriumId: category,
        slug: slugify(title)
    }, {
        where: 
        {
            id: id
        }
    }
    ).then(()=> {
        res.redirect('admin/articles')
    }).catch(err => {
        res.redirect('/')
    })

})

module.exports = router