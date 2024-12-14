const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://ngima9100:test@cluster0.0bylj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch blogs' });
  }
});


app.post('/api/blogs', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, // Default to 0 likes if not provided
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: 'Failed to save blog' });
  }
});

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})