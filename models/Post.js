const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: String,
  file: {
    type: mongoose.Types.ObjectId,
    ref: 'File'
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', schema)