const { query } = require('express-validator')

const validateExtension = ext => {
  if (
    ext === '.jpg' || 
    ext === '.jpeg' || 
    ext === '.png'
  ) {
    return true
  } else {
    return false
  }
}

const deleteFileValidator = [
  query('key')
    .notEmpty()
    .withMessage('key is required')
]

module.exports = {
  validateExtension,
  deleteFileValidator
}