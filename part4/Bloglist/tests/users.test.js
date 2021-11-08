const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../utils/test_helper")
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

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

describe("user restrictions", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })

  test("Missing username", async () => {
    const user = {
      name: "selami sahin",
      password: "somepassword"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
  })

  test("Missing password", async () => {
    const user = {
      name: "selami sahin",
      username: "some username"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
  })

  test("Username less than 3", async () => {
    const user = {
      name: "selami sahin",
      username: "AB",
      password: "test"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
  })

  test("Password less than 3", async () => {
    const user = {
      name: "selami sahin",
      username: "Selamisahin",
      password: "Ab"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})