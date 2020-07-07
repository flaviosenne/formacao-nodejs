const sequelize = require('sequelize')
const connection = require('./database')
const { Sequelize } = require('sequelize')

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(()=> {})

module.exports = Pergunta
