const knex = require('knex')({
    client: 'mysql2',
    connection:{
        host: 'localhost',
        user:'root',
        password: 'joao',
        database:'knex'
    }
})

module.exports = knex