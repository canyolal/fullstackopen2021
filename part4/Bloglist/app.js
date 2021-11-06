const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
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

module.exports = app