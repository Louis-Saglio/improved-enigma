const Sequelize = require('sequelize')
const sequelize = new Sequelize({dialect: 'sqlite', storage: 'sqlite.db'})

const Restaurants = sequelize.define(
    'restaurants',
    {
        name: {type: Sequelize.STRING},
        address: {type: Sequelize.STRING},
        capacity: {type: Sequelize.INTEGER},
    }
)

Restaurants.sync()

module.exports = Restaurants