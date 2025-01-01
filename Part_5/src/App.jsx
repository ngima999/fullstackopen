import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(null) // Stores the logged-in user
  const [blogs, setBlogs] = useState([]) // Blog list
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' }) // New blog details

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      axios
        .get('/api/blogs', { headers: { Authorization: `Bearer ${user.token}` } })
        .then((response) => setBlogs(response.data))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      const user = response.data
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)

      const blogsResponse = await axios.get('/api/blogs', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setBlogs(blogsResponse.data)
    } catch (error) {
      console.error('Login failed:', error)
      alert('Invalid username or password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        '/api/blogs',
        newBlog,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setBlogs([...blogs, response.data]) // Add the new blog to the state
      setNewBlog({ title: '', author: '', url: '' }) // Clear the form fields
      alert(`A new blog "${response.data.title}" by ${response.data.author} added`)
    } catch (error) {
      console.error('Failed to create blog:', error)
      alert('Failed to create blog')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Create new</h3>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <strong>{blog.title}</strong> by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
