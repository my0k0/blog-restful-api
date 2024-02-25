const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = require('../configs/keys')
const generateCode = require('./generateCode')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')


const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }
})

const uploadFile = async ({ file, ext }) => {
  // random_number_random_number.ext
  const Key = `${generateCode(12)}_${Date.now()}${ext}`

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Body: file.buffer,
    Key,
    ContentType: file.mimetype
  }

  const command = new PutObjectCommand(params)

  try {
    await client.send(command)
    return Key
  } catch (error) {
    console.error(error)
  }
}

const signedUrl = async (Key) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key,
  }

  const command = new GetObjectCommand(params)

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 60 }) // 60 seconds

    return url
  } catch (error) {
    console.error(error)
  }
}

const deleteFileFromS3 = async (Key) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key,
  }

  const command = new DeleteObjectCommand(params)

  try {
    await client.send(command)
    return;
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  uploadFile,
  signedUrl,
  deleteFileFromS3
}