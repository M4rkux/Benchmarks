const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {join} = require('path')

const configPath = join(__dirname, '../', '.env')

dotenv.config({
  path: configPath,
})

const {postRegisterSerial} = require('./post.controller')
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.post('/post/:post_number', postRegisterSerial)

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`)
})
