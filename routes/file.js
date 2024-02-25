const { fileController } = require('../controllers')
const isAuth = require('../middlewares/isAuth')
const upload = require('../middlewares/upload')
const { deleteFileValidator } = require('../validators/file')
const { validate } = require('../validators/validate')

const router = require('express').Router()

router.post(
  '/upload', 
  isAuth, 
  upload.single('image'), 
  // upload.array('image', 3),
  fileController.uploadFile
)

router.get('/signed-url', isAuth, fileController.getSignedUrl)

router.delete('/delete-file', isAuth, deleteFileValidator, validate, fileController.deleteFile)

module.exports = router