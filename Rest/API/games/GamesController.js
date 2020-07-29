const app = require('express').Router()
const DB = require('../db/array')

app.get('/game', (req, res)=> {
    res.status(200)
    res.json(DB.games)
})
app.get('/game/:id', (req, res)=> {
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
}),

app.post('/game', (req, res)=> {
    const {title, price, year} =req.body

    DB.games.push({
        id: parseInt(DB.games.length + 1),
        title,
        price,
        year
        }
    )
    res.json('cadastrado')
}),

app.delete('/game/:id', (req, res) => {
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
}),

app.put('/game/:id', (req, res)=> {
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
module.exports = app