const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Articles = connection.define('artigos', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
        
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false

    }
})

Category.hasMany(Articles)// Um ctegoria tem muitos artigos
Articles.belongsTo(Category) // Um artigo pertence a uma categoria

// Articles.sync({force: true})

module.exports = Articles