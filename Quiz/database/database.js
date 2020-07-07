const sequelize = require('sequelize')

const connection = new sequelize('GuiaPerguntas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection