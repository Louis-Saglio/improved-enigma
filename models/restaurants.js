const sqlite = require('sqlite')

const baseFilename = 'db.sqlite'

class Restaurants {

    constructor(address, name, capacity) {
        this.address = address
        this.name = name
        this.capacity = capacity
        this.createdOn = Date.now()
        this.updatedOn = Date.now()
    }

    static async init() {
        await sqlite.open(baseFilename)
        return await sqlite.run('CREATE TABLE IF NOT EXISTS restaurants (address, name, capacity, createdOn, updatedOn)')
    }

    async insert() {
        return sqlite.run(
                'INSERT INTO restaurants(address, name, capacity, createdOn, updatedOn) VALUES (?, ?, ?, ?, ?)',
                this.address,
                this.name,
                this.capacity,
                this.createdOn,
                this.updatedOn
        )
        .then(() => {
            this.id = data.lastID
        })
    }

    static async get(id) {
        try {
            const {address, name, capacity, updatedOn, createdOn} = await sqlite.get('SELECT * FROM restaurants WHERE rowid = ?', id)
            const resto = new Restaurants(address, name, capacity)
            resto.id = id
            resto.createdOn = createdOn
            resto.updatedOn = updatedOn
            return resto
        } catch (error) {
            return null
        }        
    }

    async update() {
        return await sqlite.run(
            'UPDATE restaurants SET address = ?, name = ?, capacity = ?, updatedOn = ? WHERE rowid = ?',
            this.address,
            this.name,
            this.capacity,
            Date.now(),
            this.id
        )
    }

    static async all() {
        return await sqlite.all('SELECT * FROM restaurants')
    }

    static delete(id) {
        sqlite.run('DELETE FROM restaurants WHERE rowid = ?', id)
    }
}


async function main() {
    await Restaurants.init()
    const resto = await new Restaurants('ad1', 'name1', 'cap1').insert()
    console.log(resto)
    resto.address = 'changed'
    await resto.update() // does not work
    console.log(await Restaurants.get(1))
    console.log(await Restaurants.all())
}

// main().then(() => {
//     console.log('end')
// })
module.exports = Restaurants