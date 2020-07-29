const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

var DB = {
    games: [
        {
            id: 1,
            title:'Good of War',
            year: 2018,
            price: 200
        },
        {
            id: 2,
            title:'Call of Dutty',
            year: 2018,
            price: 170
        },
        {
            id: 3,
            title:'Need for speed',
            year: 2012,
            price: 120
        },

    ]
}

app.get('/', (req, res)=> {
    res.status(200)
    res.json(DB.games)
})
app.get('/:id', (req, res)=> {
    const {id}= req.params

    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        // res.json(DB.games[parseInt(id-1)]) retorno direto do array
        var game = DB.games.find(game => game.id == id)

        if(game != undefined){
            res.status(200)
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})

app.post('/', (req, res)=> {
    const {title, price, year} =req.body

    DB.games.push({
        id: parseInt(DB.games.length + 1),
        title,
        price,
        year
        }
    )
    res.json('cadastrado')
})

app.delete('/:id', (req, res) => {
    const {id } = req.params
    
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        var index = DB.games.findIndex(games => games.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
        
    }
})

app.put('/:id', (req, res)=> {
    const {id} = req.params
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        // res.json(DB.games[parseInt(id-1)]) retorno direto do array
        var game = DB.games.find(game => game.id == id)

        if(game != undefined){
            
            const {title, year, price} = req.body

            if(title != undefined){
                game.title = title
            }
            if(price != undefined){
                game.price = price
            }
            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)

        }else{
            res.sendStatus(404)
        }
    }
})

app.listen(80, ()=> {
    console.log('Api runnig in port 80')
})