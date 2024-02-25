const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // 50 MB
    fileSize: 1024 * 1024 * 50
  }
})

module.exports = upload