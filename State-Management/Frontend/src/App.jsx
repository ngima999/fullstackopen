// App.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./redux/notificationReducer";
import { setBlogs, addBlog, updateBlog, deleteBlog } from "./redux/blogReducer";
import { setUser, logoutUser } from "./redux/userReducer"; // Import user actions
import Togglable from "./components/Togglable";
import Login from "./components/Login";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user); // Get the logged-in user from Redux

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get("/api/blogs", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          dispatch(setBlogs(response.data.sort((a, b) => b.likes - a.likes)));
        } catch (error) {
          console.error("Failed to fetch blogs:", error);
        }
      };
      fetchBlogs();
    }
  }, [dispatch, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(response.data));
      dispatch(setUser(response.data)); // Dispatch user to Redux
      dispatch(setNotification("Login successful", false, 5000));
    } catch {
      dispatch(setNotification("Invalid username or password", true, 5000));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogAppUser");
    dispatch(logoutUser()); // Remove user from Redux
    dispatch(setNotification("Logged out successfully", false, 5000));
    setUsername("");
    setPassword("");
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await axios.post("/api/blogs", newBlog, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch(addBlog(response.data));
      dispatch(
        setNotification(
          `A new blog "${response.data.title}" by ${response.data.author} added`,
          false,
          5000
        )
      );
    } catch (error) {
      console.error("Failed to create blog:", error);
      dispatch(setNotification("Failed to create blog", true, 5000));
    }
  };

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      const response = await axios.put(
        `/api/blogs/${updatedBlog.id}`,
        updatedBlog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      dispatch(updateBlog(response.data));

      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

      dispatch(setBlogs(sortedBlogs));

      dispatch(
        setNotification(
          `You liked "${updatedBlog.title}" successfully!`,
          false,
          5000
        )
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      dispatch(setNotification("Failed to update blog", true, 5000));
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch(deleteBlog(id));
      dispatch(setNotification("Blog deleted successfully!", false, 5000));
    } catch (error) {
      console.error("Error deleting blog:", error);
      dispatch(setNotification("Failed to delete the blog", true, 5000));
    }
  };

  return (
    <div>
      <Notification />

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
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="Create New Blog">
            <CreateBlog user={user} handleNewBlog={handleNewBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdateBlog={handleUpdateBlog}
                handleDeleteBlog={handleDeleteBlog}
                authorizedUser={user}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
