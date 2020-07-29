const app = require('./app')
require('./games/GamesController')



app.listen(80, ()=> {
    console.log('Api runnig in port 80')
})