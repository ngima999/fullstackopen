import React, { useState } from 'react';
import axios from 'axios';


const Blog = ({ blog, user, handleUpdateBlog, showNotification }) => {
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
        ...blog,
        likes: blog.likes + 1,
      };
  
      // Safeguard: Ensure `user` is properly handled
      if (updatedBlog.user && updatedBlog.user._id) {
        updatedBlog.user = updatedBlog.user._id;
      } else {
        delete updatedBlog.user; // Remove the user field if undefined or missing
      }
  
      // Send the updated blog to the backend
      const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
  
      handleUpdateBlog(response.data); // Update the blog list
      console.log('Blog liked:', response.data);
    } catch (error) {
      console.error('Failed to like the blog:', error);
      showNotification('Failed to like the blog', true);
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
          <p>Added by: {blog.user?.name || 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
