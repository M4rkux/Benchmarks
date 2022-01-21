const express = require('express')
const cors = require('cors')

const { serialRegisterAmount } = require('./controllers/serials.controller')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.post('/serial/register/:amount', serialRegisterAmount)

app.post('/post/:post_number', (req, res) => {
  const { post_number } = req.params;
  res.send('Hello World! ' + post_number)
})

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`)
})