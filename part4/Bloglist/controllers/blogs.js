const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user")

  response.json(blogs.map(blog => blog.toJSON()))

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
  //   .catch(error => error.message)
})

blogsRouter.post("/", async (request, response) => {

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
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(result)
})

module.exports = blogsRouter