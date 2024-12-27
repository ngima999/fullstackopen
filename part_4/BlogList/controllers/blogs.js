const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = express.Router();
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    response.json(blogs);
  } catch (error) {
    // response.status(500).json({ error: 'Failed to fetch blogs' });
    next(error);
  }
});



// Get individual blog by id
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});



// Create a new blog
blogsRouter.post('/', async (request, response, next) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  try {
    const { title, author, url, likes } = request.body;
    

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});



// Delete a blog by id
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
     return response.status(404).json({ error: 'Blog not found' });
}

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Not authorized to delete this blog' });
    }

    await blog.remove();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});



// Update a blog by id
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true }
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});







module.exports = blogsRouter;
