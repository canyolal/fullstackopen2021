const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../utils/test_helper")
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")


const api = supertest(app)

//beforeeach is used to clean up the database before each test
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initial_blogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initial_blogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initial_blogs[2])
  await blogObject.save()
  blogObject = new Blog(helper.initial_blogs[3])
  await blogObject.save()
  blogObject = new Blog(helper.initial_blogs[4])
  await blogObject.save()

})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    // eslint-disable-next-line no-useless-escape
    .expect("Content-Type", "application\/json; charset=utf-8")
}, 100000)

test("blogs list length", async () => {
  const response = await api.get("/api/blogs")

  //burada blog sayısının kontrolü yapılıyor ama elle
  expect(response.body).toHaveLength(helper.initial_blogs.length)
})

test("blogs have id variable", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body[0]).toBeDefined()
})


describe("post tests", () => {
  test("valid post request", async () => {
    const newBlog = {
      title: "selami şahin",
      author: "selamiii",
      url: "yapmayaselami",
      likes: 0
    }

    const firstRes = await api.get("/api/blogs")

    //initial blog length w/out post
    const initialLength = firstRes.body.length

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialLength + 1)
    expect(titles).toContain("testttitle")
  })

  test("post with no likes", async () => {
    const newBlog = {
      title: "helal sana",
      author: "adanalı celal",
      url: "kuzu kebab"
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    const last = response.body[response.body.length - 1]

    expect(last.likes).toBe(0)
  }
  )

  test("post with no url and title", async () => {
    const newBlog = {
      author: "someone",
      likes: 123897123
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
  })
})

describe("one user test", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })

  test("new username", async () => {

    const userAtStart = await helper.usersInDb()

    const user = {
      username: "canisko",
      name: "can",
      password: "test"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const userAtEnd = await helper.usersInDb()
    //user length is increased by 1
    expect(userAtEnd.length).toBe(userAtStart.length + 1)

    const usernames = userAtEnd.map(user => user.username)
    expect(usernames).toContain(user.username)
  })
})

describe("there is one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUSer = {
      username: "root",
      name: "can",
      password: "test"
    }

    const result = await api
      .post("/api/users")
      .send(newUSer)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})