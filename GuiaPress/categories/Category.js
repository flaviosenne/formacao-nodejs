const Sequelize = require('sequelize')
const connection = require('../database/database')

const Category = connection.define('categoria', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

// o metodo sync irá validar se a tabela já existe, caso sim não irá criar, caso não faz a criação
Category.sync({force: false})
module.exports = Category
