const express = require('express')
const Restaurants = require('./../model/restaurants')
const Employees = require('./../model/employees')

const router = express.Router();


router.get('/', async (req, res) => {
    res.json(await Restaurants.findAll())
})

router.get('/:id', async (req, res) => {
    const resto = await Restaurants.findById(req.params.id)
    if (resto === null) {   
        res.sendStatus(404)
    } else {
        res.json(resto)
    }
})

router.post('/', async (req, res) => {
    res.send(await Restaurants.build(req.body).save())
})

router.delete('/:id', (req, res) => {
    Restaurants.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
    Restaurants.update(
        req.body,
        {where: {id: req.params.id}}
    )
    res.send(await Restaurants.findById(req.params.id))       
})

router.get('/:id/employees', async (req, res) => {
    const employees = await Employees.findAll({where: {restaurantId: req.params.id}})
    const resto = await Restaurants.findById(req.params.id)
    resto.dataValues.employees = employees
    res.send(resto)
})

module.exports = router