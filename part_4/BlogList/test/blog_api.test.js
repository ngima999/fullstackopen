const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert');

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('the correct number of blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 2)
  })
  

  test('the first blog title is Blog 1', async () => {
    const response = await api.get('/api/blogs');
    
    // Get the first blog from the response
    const firstBlog = response.body[0];
  
    // Assert that the title of the first blog is "Learn JavaScript"
    assert.strictEqual(firstBlog.title, 'Blog 1');
  });



  test('the blogs have an id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
  
    // Get the first blog from the response
    const firstBlog = response.body[0]
  
    // Assert that the blog has the 'id' property
    assert.strictEqual(firstBlog.hasOwnProperty('id'), true)
    // Assert that the '_id' property does not exist
    assert.strictEqual(firstBlog.hasOwnProperty('_id'), false)
  })
  


// New Test: Verify POST request creates a new blog
test('making an HTTP POST request successfully creates a new blog post', async () => {
  // Fetch the initial number of blogs
  const initialResponse = await api.get('/api/blogs');
  const initialBlogsCount = initialResponse.body.length;

  // Data for the new blog post
  const newBlog = {
    title: 'New Blog Title',
    author: 'John Doe',
    url: 'http://example.com/new-blog',
    likes: 5,
  };

  // Make the POST request
  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // Assert that the response contains the new blog's title
  assert.strictEqual(postResponse.body.title, newBlog.title);

  // Fetch the blogs after the POST request
  const finalResponse = await api.get('/api/blogs');
  const finalBlogsCount = finalResponse.body.length;

  // Assert that the number of blogs increased by one
  assert.strictEqual(finalBlogsCount, initialBlogsCount + 1);

  // Verify that the content is saved correctly
  const savedBlog = finalResponse.body.find(blog => blog.title === newBlog.title);
  assert(savedBlog);
  assert.strictEqual(savedBlog.author, newBlog.author);
  assert.strictEqual(savedBlog.url, newBlog.url);
  assert.strictEqual(savedBlog.likes, newBlog.likes);
});
 

test('if likes property is missing, it defaults to 0', async () => {
  // Data for the new blog post without likes
  const newBlog = {
    title: 'Blog with no likes',
    author: 'John Doe',
    url: 'http://example.com/no-likes',
  };

  // Make the POST request
  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // Assert that the likes property is 0
  assert.strictEqual(postResponse.body.likes, 0);
});




after(async () => {
  await mongoose.connection.close()
})

