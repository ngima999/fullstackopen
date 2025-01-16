import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, showNotification, authorizedUser  }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const blogStyle = {
    padding: '10px 2px',
    border: '2px solid',
    marginBottom: '5px',
  }

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      setLoggedInUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const isBlogOwner = loggedInUser?.username === blog.user.username

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,

      }

      const loggedUserJSON = localStorage.getItem('loggedBlogAppUser') 
      const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
      const token = loggedUser ? `Bearer ${loggedUser.token}` : null

      if (!token) {
        console.error('No token found. User is not logged in.')
        showNotification('You need to log in first!', true)
        return
      }

      const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog, {
        headers: {
          Authorization: token,
        },
      })

      // Update the specific blog in the parent component
      handleUpdateBlog(response.data)
      console.log('Liked the blog:', response.data);

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
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button onClick={() => setDetailsVisible(!detailsVisible)} className="blog-toggle-details">
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <p className="blog-url">URL: {blog.url}</p>
          <p className="blog-likes">
            Likes: {blog.likes}{' '}
            <button onClick={handleLike} className="blog-like-button">Like</button>
          </p>
          <p className="blog-user">Added by: {blog.user?.name || 'unknown'}</p>
          {isBlogOwner && (
            <button onClick={confirmDelete} className="blog-delete-button" style={{ color: 'red' }}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
