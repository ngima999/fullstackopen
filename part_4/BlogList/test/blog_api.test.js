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
  
 


after(async () => {
  await mongoose.connection.close()
})

