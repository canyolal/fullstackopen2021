const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

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
  expect(response.body).toHaveLength(8)
})

test("blogs have id variable", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body[0]).toBeDefined()
})

test("post request", async () => {
  const newBlog = {
    title: "testttitle",
    author: "test",
    url: "test",
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
    title: "something",
    author: "someone",
    url: "somelink"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const last = response.body[response.body.length - 1]
  console.log("last", last)

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

afterAll(() => {
  mongoose.connection.close()
})