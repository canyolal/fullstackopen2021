const Blog = require("../models/blog")
const User = require("../models/user")

const initial_blogs = [
  {
    title: "Can and his book",
    author: "Great Can",
    url: "https://greatcan.com",
    likes: 10
  },
  {
    title: "Merve and his book",
    author: "Great Merve",
    url: "https://greatmerver.com",
    likes: 10919
  },
  {
    title: "Canyon and his book",
    author: "Great canyon",
    url: "https://greatcanyon.com",
    likes: 103123
  },
  {
    title: "RJ Hampton and his book",
    author: "Great RJ Hampton",
    url: "https://greatrjhampton.com",
    likes: 5674
  },
  {
    title: "Zion and his book",
    author: "Great z-Zion",
    url: "https://greatzion.com",
    likes: 9875
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "willremovethissoon",
    url: "willremovethissoon",
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initial_blogs, nonExistingId, notesInDb, usersInDb
}