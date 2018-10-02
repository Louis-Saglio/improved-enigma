const express = require('express')
const Employees = require('./../model/employees')

const router = express.Router();

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
    await Employees.update(
        req.body,
        {
            where: {id: req.params.id}
        }
    )
    res.send(await Employees.findById(req.params.id))    
})

module.exports = router