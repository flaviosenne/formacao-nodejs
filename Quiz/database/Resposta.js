const sequelize = require('sequelize')
const connection = require('./database')
const { Sequelize } = require('sequelize')

const Resposta = connection.define('resposta', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false})

module.exports = Resposta