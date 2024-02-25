const { File } = require('../models')
const fs = require('fs')
const path = require('path')

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req

    if (!file) {
      res.code = 400
      throw new Error('File is missing')
    }

    const newFile = new File({
      key: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      createdBy: req.user._id
    })

    await newFile.save()

    res.status(201).json({
      code: 201,
      status: true,
      message: 'File uploaded successfully',
      data: {
        key: newFile.key
      }
    })
  } catch(error) {
    next(error)
  }
}

const getSignedUrl = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}

const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query

    const filePath = path.resolve(`uploads/${key}`)
    // console.log(filePath)

    fs.unlinkSync(filePath)
    await File.findOneAndDelete({ key })

    res.status(200).json({
      code: 200,
      status: true,
      message: 'File deleted successfully'
    })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  uploadFile,
  getSignedUrl,
  deleteFile
}