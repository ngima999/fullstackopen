import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = ({ blog, handleUpdateBlog, showNotification, handleDeleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null) // To store the logged-in user

  const blogStyle = {
    padding: '10px 2px',
    border: '2px solid',
    marginBottom: '5px',
  }

  // Fetch the logged-in user from localStorage
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      setLoggedInUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  // Check if the logged-in user is the owner of the blog
  const isBlogOwner = loggedInUser?.username === blog.user.username

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user._id,  // Correctly pass the user ID as string
      }


      // Get token from localStorage
      const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
      const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
      const token = loggedUser ? `Bearer ${loggedUser.token}` : null

      if (!token) {
        console.error('No token found. User is not logged in.')
        showNotification('You need to log in first!', true)
        return
      }

      const response = await axios.put(`/api/blogs/${blog._id}`, updatedBlog, {
        headers: {
          Authorization: token, // Authorization header with token
        },
      })

      handleUpdateBlog(response.data)
      showNotification(`Liked "${blog.title}" successfully!`)
    } catch (error) {
      console.error('Error liking the blog:', error)
      showNotification('Failed to like the blog', true)
      console.log('Error details:', error.response?.data)
    }
  }


  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>Added by: {blog.user?.name || 'Unknown'}</p>
          {isBlogOwner && (
            <button onClick={confirmDelete} style={{ color: 'red' }}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
