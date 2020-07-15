const Sequelize = require('sequelize')

const connection = new Sequelize('formacaonodejs', 'flaviosenne', 'elianelima12', {
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection