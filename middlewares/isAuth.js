const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/keys')
const User = require('../models/User')

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization && req.headers.authorization.split(' ')
    const token = authorization && authorization.length > 1 ? authorization[1] : null
    
    if (!token) {
      res.code = 404
      throw new Error('Token is required')
    }

    const payload = jwt.verify(
      token,
      JWT_SECRET
    )

    if (!payload) {
      res.code = 401
      throw new Error('Unauthorized')
    }

    const user = await User.findById(payload._id)
    if (!user) {
      res.code = 401
      throw new Error('User not found')
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    next()
  } catch(error) {
    next(error)
  }
}

module.exports = isAuth