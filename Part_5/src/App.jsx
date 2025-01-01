import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Notification = ({ message, isError }) => {
  if (!message) return null;

  const notificationStyle = {
    color: 'white',
    background: isError ? 'red' : 'lightgreen',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={notificationStyle}>{message}</div>;
};



const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false); // Error flag to toggle red background for errors

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      axios
        .get('/api/blogs', { headers: { Authorization: `Bearer ${user.token}` } })
        .then((response) => setBlogs(response.data));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const user = response.data;
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);

      const blogsResponse = await axios.get('/api/blogs', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(blogsResponse.data);
      showNotification('Login successful', false); // Success notification
    } catch (error) {
      console.error('Login failed:', error);
      showNotification('Invalid username or password', true); // Error notification
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setBlogs([]);
    showNotification('Logged out successfully', false); // Success notification
  };

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        '/api/blogs',
        newBlog,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setBlogs([...blogs, response.data]);
      setNewBlog({ title: '', author: '', url: '' });
      showNotification(`A new blog "${response.data.title}" by ${response.data.author} added`, false); // Success notification
    } catch (error) {
      console.error('Failed to create blog:', error);
      showNotification('Failed to create blog', true); // Error notification
    }
  };

  const showNotification = (message, isError) => {
    setNotification(message);
    setIsError(isError);
    setTimeout(() => {
      setNotification('');
    }, 5000); // Clear notification after 5 seconds
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} isError={isError} />
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
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} isError={isError} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Create new</h3>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <strong>{blog.title}</strong> by {blog.author}
        </div>
      ))}
    </div>
  );
};

export default App;
