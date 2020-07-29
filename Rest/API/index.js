const app = require('./app')
const Games = require('./games/GamesController')
const User = require('./users/UsersController')

app.use('/', Games)
app.use('/', User)

app.listen(80, ()=> {
    console.log('Api runnig in port 80')
})