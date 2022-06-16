const jwt = require('jsonwebtoken')
const CustomError = require('../errors/customErrorClass')

const authFake = async (req, res) => {
  const { username, password } = req.body

  if (!username && !password)
    throw new CustomError(400, 'Must provide username and password.')
  else if (!username) throw new CustomError(400, 'Must provide username.')
  else if (!password) throw new CustomError(400, 'Must provide password.')

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })

  return res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  return res.status(200).json({
    msg: `Hello, ${req.user}.`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  authFake,
  dashboard
}
