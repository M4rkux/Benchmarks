const mongoose = require('mongoose')

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`,
  {
    autoIndex: true,
  }
).catch(console.error)

module.exports = mongoose
