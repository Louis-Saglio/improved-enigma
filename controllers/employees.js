const express = require('express')
// const Employees = require('./../models/employees')
const {Restaurants, Employees} = require('./../orm/restaurants')

const router = express.Router();

// Employees.init()

router.get('/', async (req, res) => {
    res.json(await Employees.findAll())
})

router.get('/:id', async (req, res) => {
    const resto = await Employees.findById(req.params.id)
    if (resto === null) {   
        res.sendStatus(404)
    } else {
        res.json(resto)
    }
})

router.post('/', async (req, res) => {
    Employees.build(req.body).save()
    res.sendStatus(201)
})

router.delete('/:id', (req, res) => {
    Employees.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
    Employees.update(
        req.body,
        {where: {id: req.params.id}}
    )
    res.sendStatus(204)    
})

module.exports = router