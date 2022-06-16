const jwt = require('jsonwebtoken')
const CustomError = require('../errors/customErrorClass')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError(401, 'No token provided.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.username

    return next()
  } catch (error) {
    throw new CustomError(
      401,
      `Not authorized to acces this route. ${error.message}`
    )
  }
}

module.exports = authMiddleware
