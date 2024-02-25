require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { connectMongoDB } = require('./init/mongodb')
const { authRoute, categoryRoute, fileRoute, postRoute } = require('./routes')
const { errorHandler } = require('./middlewares')
const { notFound } = require('./controllers/notfound')
const path = require('path')

const app = express()

connectMongoDB()
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json({limit: "500mb"}))
app.use(bodyParser.urlencoded({limit: "500mb", extended: true}))
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/file', fileRoute)
app.use('/api/v1/post', postRoute)

app.use('*', notFound)

app.use(errorHandler)

module.exports = app