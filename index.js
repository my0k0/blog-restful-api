const http = require('http')
const app = require('./app')
const { PORT } = require('./configs/keys')

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

