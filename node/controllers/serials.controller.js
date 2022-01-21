async function serialRegisterAmount(req, res) {
  const { amount } = req.params
  const response = [];
  for (let i = 1; i <= amount; i++) {
    response.push(_getDate() + _digits(_toHex(i), 4))
  }
  res.send(response)
}

function _toHex(number) {
  return number.toString(16).toUpperCase()
}

function _getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = _digits(date.getMonth() + 1, 2)
  const day = _digits(date.getDate(), 2)

  return `${year}${month}${day}`
}

function _digits(content, digits) {
  return ("0".repeat(digits) + content).slice(-digits)
}

module.exports = {
  serialRegisterAmount
}