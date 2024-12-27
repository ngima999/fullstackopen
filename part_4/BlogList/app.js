const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI } = require('./utils/config');
const { userExtractor, tokenExtractor, errorHandler } = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login')
require('dotenv').config();


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
// Token extractor middleware
app.use(tokenExtractor);
app.use(middleware.userExtractor)

// Routes
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


// Error handling middleware
app.use(errorHandler);





module.exports = app;
