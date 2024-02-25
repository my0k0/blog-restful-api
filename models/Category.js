const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  updateBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Category', schema)