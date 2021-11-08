const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(request.body.userId)

  // if request has no likes field then assign likes = 0
  if (!request.body.likes) {
    Object.assign(blog, { likes: 0 })
  }

  // if request has no author and title then return 400
  if (!request.body.url && !request.body.title) return response.status(400).json({ error: "title and url are required" })

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!(request.token || decodedToken.id)) {
  //   return response.status(401).json({ error: "token missing or invalid" })
  // }

  // const blog = await Blog.findById(request.params.id)

  // if (request.user.toString() !== decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" })
  // }

  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(result)
})

module.exports = blogsRouter