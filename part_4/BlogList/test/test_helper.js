const User = require('../models/user')

// ...

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Author 1',
    url: 'http://example.com/1',
    likes: 10,
  },
  {
    title: 'Test Blog 2',
    author: 'Author 2',
    url: 'http://example.com/2',
    likes: 5,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((u) => u.toJSON());
};
module.exports = {
  
  usersInDb,
  blogsInDb
};
