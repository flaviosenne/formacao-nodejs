const database = require('./database')
const { update } = require('./database')

// insert

// const dados = [
//     {
//         nome: 'Wolverine',
//         preco: 90.00
//     },{
//         nome: 'Capitão América',
//         preco: 100.00
//     },{
//         nome: 'Besta',
//         preco: 50.00
//     }
// ]
// database.insert(dados).into('games').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))


// select

// database.select().table('games').then(data => {
//     console.log(data)
// }).catch(err => {console.log(err)})


// nested query
// database.insert({ nome: 'exemplo', preco: 130 }).into('games').then(data => {
//     database.select().table('games').then(data => {
//         console.log(data)
//     }).catch(err => { console.log(err) })

// }).catch(err => console.log(err))

// Where
//  database.select()
//     // .where({nome: 'exemplo'})
//     .whereRaw('nome = "Superman" OR preco > 100')
//     // .orWhere({id: '2'})
//     .table('games').then(data =>{
//         console.log(data)
//     }).catch(err => console.log(err))

// database.raw('select * from games').then(data => {
//     console.log(data)
// })



// delete
// database.where({id: 3}).delete().table('games').then(data => {
//     console.log(data)
// }).catch(console.log)


// update

// database.where({id: 1}).update({preco: 40}).table('games').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))


// order
// database.select().table('games').orderBy('nome', 'desc').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))


// associete insert
// database.insert({
//     nome: "Marvel",
//     games_id: 1
// }).table('estudios').then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

// 1 para 1
// database
// .select(['games.id as game_id',
// "estudios.id as estudio_id",
//  "games.nome as game_nome",
//   "estudios.nome as estudio_nome"])
// .select(['games.*','estudios.nome as estudioNome'])
// .table('games').innerJoin('estudios', "estudios.games_id", "games.id").then(data => {
//     console.log(data)
// }).catch(err => console.log(err))


//leftJoin
//rightJoin

// database
// .select(['games.*','estudios.nome as estudioNome'])
// .table('games').leftJoin('estudios', "estudios.games_id", "games.id")
// .where('games.id', 1).then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

// 1 para N

// database.select('games.*', 'estudios.nome as estudios_nome').table('games')
// .innerJoin('estudios', 'estudios.games_id', 'games.id')
// .then(data => {
//     // var estudiosGamesArray = data
//     var game = {
//         id: 0,
//         nome: '',
//         estudios: []
//     }
//     game.id = data[0].id
//     game.nome = data[0].nome

//     data.forEach(estudios => {
//         game.estudios.push({nome: estudios.estudios_nome})
//     })
//     console.log(game)
// }).catch(err => {
//     console.log(err)
// } )

// N para N

// database.select([
//     "estudios.nome as estudio_nome",
//     "games.nome as game_nome"
// ]).table('estudios_games')
// // primeiro parametro é qual a tabela referenciada
// // em seguida quais são as chaves que liguam as tabelas
// .innerJoin('games', 'games.id', 'estudios_games.games_id')
// .innerJoin('estudios', 'estudios.id', 'estudios_games.estudios_id')
// .where('estudios.id',3)
// .then(data => {
//     console.log(data)
// }).catch(err => console.log(err))


// Transactions - Transações
async function testeTransacao(){
    
    try{
        await database.transaction(async trans => {
            await database.insert({nome: 'Qualquer'}).table('estudios')
            await database.insert({nome: 'Qualquer 2'}).table('estudios')
            await database.insert({nome: 'Qualquer 2'}).table('estudios')
        
        })
    }
    catch(err){
        console.log(err)
    }

}

testeTransacao()