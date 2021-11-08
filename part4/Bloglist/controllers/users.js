const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
  const body = request.body

  if (!(body.password)) {
    return response.status(400).json({ error: "password is missing" })
  }

  if (!(body.username)) {
    return response.status(400).json({ error: "username is missing" })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: "username and password must be at least 3 characters" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs", {
      title: 1,
      author: 1
    })

  response.status(201).json(users)
})

module.exports = usersRouter