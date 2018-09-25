const express = require('express')
const Restaurant = require('./../models/restaurants')

const router = express.Router();

Restaurant.init()

router.get('/:id', async (req, res) => {
    const resto = await Restaurant.get(req.params.id);
    if (resto === null) {
        res.sendStatus(404)
    } else {
        res.json(resto)
    }
})

router.post('/', (req, res) => {
    const {address, name, capacity} = req.body
    new Restaurant(address, name, capacity).insert()
    res.sendStatus(201)
})

router.put('/:id', )

module.exports = router