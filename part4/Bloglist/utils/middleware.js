// const User = require("../models/user")
// const jwt = require("jsonwebtoken")

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

// const userExtractor = async (request, response, next) => {

//   const decodedToken = jwt.verify(request.token, process.env.SECRET)

//   if (!(request.token || decodedToken.id)) {
//     return response.status(401).json({ error: "token missing or invalid" })
//   }

//   let user = await User.findById(decodedToken.id)

//   request.user = user

//   next()
// }

module.exports = {
  unknownEndpoint,
  tokenExtractor
}