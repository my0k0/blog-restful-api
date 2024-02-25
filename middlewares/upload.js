const multer = require('multer')
const path = require('path')
const generateCode = require('../utils/generateCode')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads')
  },
  filename: (req, file, callback) => {
    // original_file_name_12_digit_random_number.ext
    const code = generateCode(12)
    const originalName = file.originalname
    const extension = path.basename(originalName)
    const filename = originalName.replace(extension,'')
    const compressedFilename = filename.split(' ').join('_')
    const lowercaseFilename = compressedFilename.toLocaleLowerCase()
    const finalFile = code + '_' + lowercaseFilename + extension
    callback(null, finalFile)
  },
})

const upload = multer({
  // dest: './uploads'
  storage,
  fileFilter: (req, file, callback) => {
    const mimeType = file.mimetype

    if (
      mimeType === 'image/jpg' || 
      mimeType === 'jpeg' || 
      mimeType === 'image/png' || 
      mimeType === 'application/pdf'
    )
      callback(null, true)
    else 
      callback(new Error('Only .jpg or .jpeg or .png or .pdf format is allowed'))
  },
  limits: {
    fileSize: 1024 * 1024 * 50
  }
})

module.exports = upload