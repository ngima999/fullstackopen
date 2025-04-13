import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Blog from './components/Blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: '', isError: false })


  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('/api/blogs', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
          setBlogs(response.data.sort((a, b) => b.likes - a.likes))
        } catch (error) {
          console.error('Failed to fetch blogs:', error)
        }
      }
      fetchBlogs()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.data))
      setUser(response.data)
      showNotification('Login successful', false)
    } catch {
      showNotification('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser');
    setUser(null)
    showNotification('Logged out successfully', false)
    setUsername('')
    setPassword('')
  }


  const handleNewBlog = async (newBlog) => {
    try {
      const response = await axios.post(
        '/api/blogs',
        newBlog,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setBlogs((prevBlogs) => [...prevBlogs, response.data]) // Add the new blog to the state
      showNotification(`A new blog "${response.data.title}" by ${response.data.author} added`)
    } catch (error) {
      console.error('Failed to create blog:', error)
      alert('Failed to create blog')
    }
  }


  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.map((blog) =>
        blog.id === updatedBlog.id ? {...blog, likes: updatedBlog.likes} : blog
      )
      // Sort blogs by likes after updating the like
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    })
  }

  const handleDeleteBlog = async (id) => {
    try {
      const token = `Bearer ${user.token}` // Make sure user.token exists

      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: token, // Correctly include the token
        },
      })

      setBlogs(blogs.filter((blog) => blog.id !== id))
      showNotification('Blog deleted successfully!')
    } catch (error) {
      console.error('Error deleting blog:', error)
      showNotification('Failed to delete the blog', true)
    }
  }

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification({ message: '', isError: false }), 5000)
  }

  return (
    <div>
      <Notification notification={notification} />

      {!user ? (
        <Togglable buttonLabel="Log in">
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p placeholder='userLoginMessage'>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="Create New Blog">
            <CreateBlog user={user} handleNewBlog={handleNewBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdateBlog={handleUpdateBlog} // Pass the update function
              handleDeleteBlog={handleDeleteBlog} // Pass the delete function
              showNotification={showNotification}
              authorizedUser={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App