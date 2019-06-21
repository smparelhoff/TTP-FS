'use strict'

const db = require('../server/db')
const {User, Trade} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstname: 'Cody',
      lastname: 'Dogg'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstname: 'Murphy',
      lastname: 'Klogg'
    })
  ])

  const codyId = users[0].id
  const murphyId = users[1].id

  await Promise.all([
    Trade.create({
      symbol: 'AMD',
      price: 30.555,
      shares: 100,
      userId: codyId
    }),
    Trade.create({
      symbol: 'GE',
      price: 10.445,
      shares: 70,
      userId: codyId
    }),
    Trade.create({
      symbol: 'CHK',
      price: 1.855,
      shares: 95,
      userId: codyId
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
