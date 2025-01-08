import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = ({ user, handleNewBlog, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        '/api/blogs',
        { title, author, url },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      handleNewBlog(response.data);
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={toggleVisibility}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
