const Sequelize = require('sequelize')
const sequelize = new Sequelize({dialect: 'sqlite', storage: 'sqlite.db'})
const Restaurants = require('./restaurants')

const Employees = sequelize.define(
    'employees',
    {
        name: {type: Sequelize.STRING},
    }
)
Employees.belongsTo(Restaurants)

Employees.sync()

module.exports = Employees