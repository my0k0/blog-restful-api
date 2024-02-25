const path = require('path')
const { validateExtension } = require('../validators/file')
const aws = require('../utils/awsS3')

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req

    if (!file) {
      res.code = 400
      throw new Error('File is not selected')
    }

    const ext = path.extname(file.originalname)
    const isValidExtension = validateExtension(ext)

    if (!isValidExtension) {
      res.code = 400
      throw new Error('Only .jpg or .jpeg or .png format is allowed')
    }

    const key = await aws.uploadFile({
      file,
      ext
    })
    res.status(201).json({
      code: 201,
      status: true,
      message: 'File uploaded successfully'
    })
  } catch(error) {
    next(error)
  }
}

const getSignedUrl = async (req, res, next) => {
  try {
    const { key } = req.query

    const url = await aws.getSignedUrl(key)

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Get signed url successfully',
      data: {
        url
      }
    })
  } catch (error) {
    next(error)
  }
}

const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query
    await aws.deleteFileFromS3(key)
    await File.findOneAndDelete({key})

    res.status(200).json({
      code: 200,
      status: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadFile,
  getSignedUrl,
  deleteFile
}