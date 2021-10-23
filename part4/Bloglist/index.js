const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")
const app = require("./app")

const server = http.createServer(app)

server.listen()
app.listen(config.PORT, () => {
  logger.log(`Server running on port ${config.PORT}`)
})