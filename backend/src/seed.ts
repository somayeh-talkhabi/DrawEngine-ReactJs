import { exit } from 'process'

import { fakerNL as faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import ora from 'ora'
import pkg from 'pg'

dotenv.config()

const { Pool } = pkg

// Database configuration
let pool: InstanceType<typeof Pool>
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
} else {
    pool = new Pool({
        user: 'myuser',
        host: 'localhost',
        database: 'mydatabase',
        password: 'mypassword',
        port: 5432
    })
}

// Helper to sometimes reuse an existing zip code
const zipCodes: string[] = []
function getRandomOrExistingZipCode(): string {
    if (zipCodes.length > 0 && Math.random() < 0.15) {
        return zipCodes[Math.floor(Math.random() * zipCodes.length)]
    }
    const newZip = faker.location.zipCode()
    zipCodes.push(newZip)
    return newZip
}

async function seedDatabase() {
    await pool.connect()

    // Clearing the database
    await pool.query('TRUNCATE TABLE tickets RESTART IDENTITY CASCADE')
    await pool.query('TRUNCATE TABLE prizes RESTART IDENTITY CASCADE')
    await pool.query('TRUNCATE TABLE draws RESTART IDENTITY CASCADE')

    // Inserting data into the 'prizes' table
    for (let i = 0; i < 10; i++) {
        const amountInCents = faker.number.int({ min: 100, max: 1000000 })
        await pool.query('INSERT INTO prizes(amount_in_cents) VALUES($1)', [
            amountInCents
        ])
    }

    // Inserting data into the 'tickets' table
    for (let i = 0; i < 5000; i++) {
        const postalcode = getRandomOrExistingZipCode()
        const username = faker.internet.userName() + '-' + i
        const housenumber = faker.number.int({ min: 1, max: 300 }).toString()
        const city = faker.location.city()
        const amountOfTickets = faker.number.int({ min: 1, max: 10 })
        await pool.query(
            'INSERT INTO tickets(postalcode, username, housenumber, city, amount_of_tickets) VALUES($1, $2, $3, $4, $5)',
            [postalcode, username, housenumber, city, amountOfTickets]
        )
    }
    exit()
}

const spinner = ora('Seeding database').start()
seedDatabase()
    .then(() => {
        spinner.succeed('Data seeding completed successfully!')
    })
    .catch((error) => {
        spinner.fail('Data seeding failed')
        console.error(error)
    })
