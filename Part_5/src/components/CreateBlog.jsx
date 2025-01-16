import React, { useState } from 'react'
import axios from 'axios'

const CreateBlog = ({ user, handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        '/api/blogs',
        { title, author, url },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      handleNewBlog(response.data)
    } catch (error) {
      console.error('Failed to create blog:', error)
    }
  };

  return (
    <form onSubmit={handleBlogCreation}>
      <h3>Create new</h3>
      <div>
        Title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        URL: <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog
