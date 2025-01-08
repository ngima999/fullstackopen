import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Notification from './Notification';
import CreateBlog from './CreateBlog';
import Blog from './Blog';

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: '', isError: false });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    axios
      .get('/api/blogs')
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error('Failed to fetch blogs:', error));

    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const user = response.data;
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      showNotification('Login successful', false);
    } catch (error) {
      console.error('Login failed:', error);
      showNotification('Invalid username or password', true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    showNotification('Logged out successfully', false);

    // Reset form inputs
  setUsername('');
  setPassword('');
  };

  const handleNewBlog = (blog) => {
    setBlogs([...blogs, blog]);
    setShowCreateForm(false); // Hide form after creation
    showNotification(`A new blog "${blog.title}" by ${blog.author} added`, false);
  };

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: '', isError: false });
    }, 5000);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

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
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
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
        <Blog key={blog.id} blog={blog} user={user} handleUpdateBlog={handleUpdateBlog} />
      ))}
        </>
      )}
    </div>
  );
};

export default App;
