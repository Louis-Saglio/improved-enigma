const express = require('express')
const restoRouter = require('./controllers/restaurants')
const employeeRouter = require('./controllers/employees')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
    next();
    console.log('REQUEST: ' + req.method + ' ' + req.originalUrl)
});
app.use('/restaurants', restoRouter)
app.use('/employees', employeeRouter)

app.listen(5000, () => {console.log('running')})