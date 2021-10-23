const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.log("conntected to MONGODB server")
  })
  .catch(error => logger.error("CANNOT connect to MongoDB", error.message))

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

http.createServer()
app.listen(config.PORT, () => {
  logger.log(`Server running on port ${config.PORT}`)
})