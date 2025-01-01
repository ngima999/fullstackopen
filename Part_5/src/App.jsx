import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(null) // Stores the logged-in user
  const [blogs, setBlogs] = useState([]) // Blog list
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  useEffect(() => {
    // Check localStorage for saved user data
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // Fetch blogs with the saved token
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
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) //save user to local storage
      setUser(user) // Save the user to state
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



  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser') // remove user from local storage 
    setUser(null) // remove user from state
    setBlogs([]) // clear blog list
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
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <strong>{blog.title}</strong> by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
