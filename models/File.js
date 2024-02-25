const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  size: Number,
  mimetype: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('File', schema)