import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(null) // Stores the logged-in user
  const [blogs, setBlogs] = useState([]) // Blog list
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      setUser(response.data) // Save the user to state
      // Optionally, fetch blogs after successful login
      const blogsResponse = await axios.get('/api/blogs', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      })
      setBlogs(blogsResponse.data)
    } catch (error) {
      console.error('Login failed:', error)
      alert('Invalid username or password')
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
      <p>{user.name} is logged in</p>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <strong>{blog.title}</strong> by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
