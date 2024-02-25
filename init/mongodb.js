const mongoose = require('mongoose')
const { MONGODB_URI } = require('../configs/keys')

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.info('connected to MongoDB')
  } catch(error) {
    console.error(error.message)
  }
}

module.exports = {
  connectMongoDB
}