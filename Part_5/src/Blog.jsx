import React, { useState } from 'react';
import axios from 'axios';

const Blog = ({ blog, user, handleUpdateBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid 2px',
    borderWidth: 1,
    marginBottom: 5,
  };

  

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,  // This includes all the fields of the original blog
        likes: blog.likes + 1,
        user: blog.user._id,  // Correctly pass the user ID as string
      };
  
      // Send the updated blog to the backend
      const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
      handleUpdateBlog(response.data); // Update the blog list with the updated blog
    } catch (error) {
      console.error('Failed to like the blog:', error);
    }
  };
  
  

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
            <button onClick={() => handleLike(blog)}>Like</button>
          </p>
          <p>Added by: {user?.name || 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
