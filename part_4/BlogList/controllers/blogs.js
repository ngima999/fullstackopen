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



// Helper function to extract token
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  return authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;
};





blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  try {
    const token = getTokenFrom(request);
    if (!token) {
      return response.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

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
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

    if (deletedBlog) {
      response.status(204).end();  // No content, successful deletion
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
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
