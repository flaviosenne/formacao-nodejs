const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const connection = require('./database/database')
const perguntaModel = require('./database/Pergunta')
const respostaModel = require('./database/Resposta')
const Resposta = require('./database/Resposta')

connection.authenticate().then(()=> {
    console.log('Conexão feita com o BD')
}).catch((err)=> {
    console.log(err)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    perguntaModel.findAll({raw: true, order: [['id', 'desc']]}).then(perguntas => {
        console.log(perguntas)
        res.render('index', {perguntas: perguntas})
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})
app.post('/salvar-pergunta', (req, res)=> {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=> {
        res.redirect('/')
    })

})

app.get('/pergunta/:id', (req, res)=> {
    var id = req.params.id
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'desc']]
            }).then(respostas =>{
                res.render('pergunta',
                {
                pergunta: pergunta,
                resposta: respostas
                })

            })

        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var pergunta = req.body.pergunta

    respostaModel.create({
        corpo: corpo,
        perguntaid: pergunta
    }).then(()=> {
        res.redirect('/pergunta/'+pergunta)
    })
})

app.listen(8080, ()=> {console.log('APP running...')})