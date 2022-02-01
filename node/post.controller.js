const mongoose = require('./database')

const registerSchema = new mongoose.Schema({
  serial: {
    type: String
  },
  valid: {
    type: Boolean
  },
  postNumber: {
    type: Number
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
})

const Register = mongoose.model('Register', registerSchema)

function _checkSerial(serial) {
  const regexp = new RegExp('^([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])([0-9A-F]{4})$')
  return regexp.test(serial)
}

async function _checkPreviousPosts(serial, postNumber) {
  try {
    const register = await Register.findOne({serial, valid: true}).sort('-postNumber')
    return (!register && postNumber === 1) || register.postNumber === postNumber - 1
  } catch (err) {
    return false
  }
}

async function postRegisterSerial(req, res) {
  const postNumber = Number(req.params.post_number)
  const {serial} = req.body
  const valid = await _checkPreviousPosts(serial, postNumber)

  console.log({postNumber, serial, valid})
  if (!_checkSerial(serial)) return res.status(500).send(`Serial ${serial} is invalid`)

  try {
    await Register.create({
      serial,
      valid,
      postNumber,
    })
  
  } catch (err) {
    console.error(err)
    return res.status(500).send({ok: false, postNumber, serial, valid})
  }

  return res.status(200).send({ok: true, postNumber, serial, valid})
}


module.exports = {
  postRegisterSerial,
}
