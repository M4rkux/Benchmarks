const mongoose = require('./database')

const registerSchema = new mongoose.Schema({
  serial: {
    type: {type: String},
  },
  valid: {
    type: {type: Boolean},
  },
  postNumber: {
    type: {type: Number},
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
})

const Register = mongoose.model('Register', registerSchema)

async function postRegisterSerial(req, res) {
  const {post_number: postNumber} = req.params
  const {serial} = req.body
  const response = {postNumber, serial}

  try {
    const register = await Register.create({
      serial,
      valid: false,
      postNumber,
    })
  
    console.log('register', register)
  } catch (err) {
    console.error(err)
  }

  res.send(response)
}


module.exports = {
  postRegisterSerial,
}
