const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI } = require('./utils/config');
const { errorHandler } = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter);





app.use(errorHandler);




module.exports = app;
