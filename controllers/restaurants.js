const express = require('express')
const {Restaurants, Employees} = require('./../model/restaurants')

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
    Restaurants.build(req.body).save()
    res.sendStatus(201)
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
    res.sendStatus(204)    
})

router.get('/:id/employees', async (req, res) => {
    const employees = await Employees.findAll({where: {restaurantId: req.params.id}})
    res.send(employees)
})

module.exports = router