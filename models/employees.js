const sqlite = require('sqlite')

const baseFilename = 'db.sqlite'

class Employees {

    constructor(name, restaurant_id) {
        this.name = name
        this.restaurant_id = restaurant_id
        this.createdOn = Date.now()
        this.updatedOn = Date.now()
    }

    static async init() {
        await sqlite.open(baseFilename)
        return await sqlite.run('CREATE TABLE IF NOT EXISTS employees (name, restaurant_id, createdOn, updatedOn)')
    }

    async insert() {
        const data = await sqlite.run(
                'INSERT INTO employees(name, restaurant_id, createdOn, updatedOn) VALUES (?, ?, ?, ?)',
                this.name,
                this.restaurant_id,
                this.createdOn,
                this.updatedOn
            )
        this.id = data.lastID
        return this
    }

    static async get(id) {
        try {
            const {name, restaurant_id, updatedOn, createdOn} = await sqlite.get('SELECT * FROM employees WHERE rowid = ?', id)
            const employee = new Employees(name, restaurant_id)
            employee.id = id
            employee.createdOn = createdOn
            employee.updatedOn = updatedOn
            return employee
        } catch (error) {
            return null
        }        
    }

    async update() {
        return await sqlite.run(
            'UPDATE employees SET name = ?, restaurant_id = ?, updatedOn = ? WHERE rowid = ?',
            this.name,
            this.restaurant_id,
            Date.now(),
            this.id
        )
    }

    static async all() {
        return await sqlite.all('SELECT * FROM employees')
    }

    static delete(id) {
        sqlite.run('DELETE FROM employees WHERE rowid = ?', id)
    }
}

module.exports = Employees