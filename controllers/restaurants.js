const express = require('express')
const Restaurants = require('./../models/restaurants')

const router = express.Router();

Restaurants.init()

router.get('/', async (req, res) => {
    const restos = await Restaurants.all();
    res.json(restos);
})

router.get('/:id', async (req, res) => {
    const resto = await Restaurants.get(req.params.id);
    if (resto === null) {
        res.sendStatus(404)
    } else {
        res.json(resto)
    }
})

router.post('/', (req, res) => {
    const {address, name, capacity} = req.body
    new Restaurants(address, name, capacity).insert()
    .then(() => {
        res.sendStatus(201)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
    Restaurants.delete(req.params.id)
    res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
    const resto = await Restaurants.get(req.params.id);
    if (resto == undefined) {
        res.sendStatus(404)
    } else {
        const {address, name, capacity} = req.body
        resto.address = (address == undefined ? resto.address : address)
        resto.name = (name == undefined ? resto.name : name)
        resto.capacity = (capacity == undefined ? resto.capacity : capacity)
        resto.update()
        res.sendStatus(204)
    }
    
})

module.exports = router