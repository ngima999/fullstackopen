import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Blog from './components/Blog'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: '', isError: false })
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {

    // Check if a user is already logged in from localStorage
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }

    axios
      .get('/api/blogs')
      .then((response) => {
        // Sort blogs by likes in descending order
        const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
      .catch((error) => console.error('Failed to fetch blogs:', error))

  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      const user = response.data
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      showNotification('Login successful', false)
    } catch (error) {
      console.error('Login failed:', error)
      showNotification('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    showNotification('Logged out successfully', false)

    // Reset form inputs
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = (blog) => {
    const updatedBlogs = [...blogs, blog]
    // Sort the blogs before setting the state
    const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
    setShowCreateForm(false) // Hide form after creation
    showNotification(`A new blog "${blog.title}" by ${blog.author} added`, false)
  }

  const handleUpdateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    // Sort the blogs before setting the state
    const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }


  const showNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: '', isError: false })
    }, 5000)
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





  return (
    <div>
      <Notification notification={notification} />

      {!user ? (
        <div>
          {loginVisible ? (
            <div>
              <Login
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
              <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setLoginVisible(true)}>Log in</button>
          )}
        </div>
      ) : (
        <p>
          {user.name} logged in <button onClick={handleLogout} >Logout</button>
        </p>
      )}

      {user && (
        <>
          {showCreateForm ? (
            <CreateBlog
              user={user}
              handleNewBlog={handleNewBlog}
              toggleVisibility={() => setShowCreateForm(false)}
            />
          ) : (
            <button onClick={() => setShowCreateForm(true)}>Create New Blog</button>
          )}

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={blog.user}
              handleUpdateBlog={handleUpdateBlog}
              showNotification={showNotification}
              handleDeleteBlog={handleDeleteBlog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
