const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../utils/test_helper")

const Blog = require("../models/blog")

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
      url: "kuzu kebab",
      userId: "",
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

afterAll(() => {
  mongoose.connection.close()
})