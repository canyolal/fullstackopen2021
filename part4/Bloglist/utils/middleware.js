const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  request.user = blog.user.toString()

  next()
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}