const router = require('express').Router()

router.get('/articles', (req, res)=> {
    res.send('Rota de Artigos')
})
router.get('/admin/articles/new', (req, res)=> {
    res.send('nova Rota de Artigos')
})

module.exports = router