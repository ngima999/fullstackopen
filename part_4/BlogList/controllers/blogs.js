const express = require('express');
const Blog = require('../models/blog');
const blogsRouter = express.Router();



blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
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



blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  
  // Check if title or url is missing and return 400 if true
  if (!title) {
    return response.status(400).json({ error: 'Title is required' });
  }
  if (!url) {
    return response.status(400).json({ error: 'URL is required' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    // response.status(400).json({ error: 'Failed to save blog' });
    next(error); // Forward error to the error handler
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
