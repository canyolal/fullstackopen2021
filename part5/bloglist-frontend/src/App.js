import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from "./services/login"
import "./index.css"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        "Logged Blog App User ", JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")

      setMessage(`${user.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage('Wrong Password/Username')
      setPassword("")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes,
      userId: user.id
    }
    try {
      await blogService.createBlog(newBlog)
      setMessage("New Blog Post is Added Successfully")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setTitle("")
      setAuthor("")
      setUrl("")
      setLikes(null)

    } catch (exception) {
      setMessage('You should enter fields correctly')
      setPassword("")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      {user.username} logged in.
      <button type="submit">Logout</button>
    </form>
  )


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>

      <div>
        Password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          Url
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>

        <div>
          Likes
          <input
            type="number"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>



  )

  return (

    < div className="outer">

      {user !== null && logoutForm()}
      {user === null && loginForm()}
      {user !== null && blogForm()}

      <Notification message={message} />

      <h2>blogs</h2>
      <table>
        <thead>
          <tr>
            <th> Title </th>
            <th> Author </th>
          </tr>
        </thead>
        <tbody>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </tbody>
      </table>
    </div >
  )
}

export default App