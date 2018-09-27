const express = require('express')
const Employees = require('./../models/employees')

const router = express.Router();

Employees.init()

router.get('/', async (req, res) => {
    const restos = await Employees.all();
    res.json(restos);
})

router.get('/:id', async (req, res) => {
    const resto = await Employees.get(req.params.id);
    if (resto === null) {
        res.sendStatus(404)
    } else {
        res.json(resto)
    }
})

router.post('/', (req, res) => {
    const {name, restaurant_id} = req.body
    new Employees(name, restaurant_id).insert()
    .then(() => {
        res.sendStatus(201)
    })
    .catch(() => {
        res.sendStatus(500)
    }) // todo reflect in restaurants
})

router.delete('/:id', (req, res) => {
    Employees.delete(req.params.id)
    res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
    const employee = await Employees.get(req.params.id);
    if (employee == undefined) {
        res.sendStatus(404)
    } else {
        const {name, restaurant_id} = req.body
        employee.name = (name == undefined ? employee.name : name)
        employee.restaurant_id = (restaurant_id == undefined ? employee.restaurant_id : restaurant_id)
        employee.update()
        res.sendStatus(204)
    }
    
})

module.exports = router