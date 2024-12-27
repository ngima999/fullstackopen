const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { initialBlogs, nonExistingId, usersInDb } = require('./test_helper'); // assuming you have a helper to fetch initial data
const api = supertest(app)


// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })



// test('the correct number of blog posts are returned', async () => {
//     const response = await api.get('/api/blogs')
  
//     assert.strictEqual(response.body.length, 2)
//   })
  

//   test('the first blog title is Blog 1', async () => {
//     const response = await api.get('/api/blogs');
    
//     // Get the first blog from the response
//     const firstBlog = response.body[0];
  
//     // Assert that the title of the first blog is "Learn JavaScript"
//     assert.strictEqual(firstBlog.title, 'Blog 1');
//   });



//   test('the blogs have an id property instead of _id', async () => {
//     const response = await api.get('/api/blogs')
  
//     // Get the first blog from the response
//     const firstBlog = response.body[0]
  
//     // Assert that the blog has the 'id' property
//     assert.strictEqual(firstBlog.hasOwnProperty('id'), true)
//     // Assert that the '_id' property does not exist
//     assert.strictEqual(firstBlog.hasOwnProperty('_id'), false)
//   })
  


// // New Test: Verify POST request creates a new blog
// test('making an HTTP POST request successfully creates a new blog post', async () => {
//   // Fetch the initial number of blogs
//   const initialResponse = await api.get('/api/blogs');
//   const initialBlogsCount = initialResponse.body.length;

//   // Data for the new blog post
//   const newBlog = {
//     title: 'New Blog Title',
//     author: 'John Doe',
//     url: 'http://example.com/new-blog',
//     likes: 5,
//   };

//   // Make the POST request
//   const postResponse = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   // Assert that the response contains the new blog's title
//   assert.strictEqual(postResponse.body.title, newBlog.title);

//   // Fetch the blogs after the POST request
//   const finalResponse = await api.get('/api/blogs');
//   const finalBlogsCount = finalResponse.body.length;

//   // Assert that the number of blogs increased by one
//   assert.strictEqual(finalBlogsCount, initialBlogsCount + 1);

//   // Verify that the content is saved correctly
//   const savedBlog = finalResponse.body.find(blog => blog.title === newBlog.title);
//   assert(savedBlog);
//   assert.strictEqual(savedBlog.author, newBlog.author);
//   assert.strictEqual(savedBlog.url, newBlog.url);
//   assert.strictEqual(savedBlog.likes, newBlog.likes);
// });
 

// test('if likes property is missing, it defaults to 0', async () => {
//   // Data for the new blog post without likes
//   const newBlog = {
//     title: 'Blog with no likes',
//     author: 'John Doe',
//     url: 'http://example.com/no-likes',
//   };

//   // Make the POST request
//   const postResponse = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   // Assert that the likes property is 0
//   assert.strictEqual(postResponse.body.likes, 0);
// });



// test('should return 400 if title is missing', async () => {
//   const newBlog = {
//     author: 'John Doe',
//     url: 'http://example.com/no-title',
//     likes: 5,
//   };

//   const postResponse = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)  // Expect 400 Bad Request
//     .expect('Content-Type', /application\/json/);

//   assert.strictEqual(postResponse.body.error, 'Title is required');
// });



// test('should return 400 if url is missing', async () => {
//   const newBlog = {
//     title: 'Blog without URL',
//     author: 'John Doe',
//     likes: 5,
//   };

//   const postResponse = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)  // Expect 400 Bad Request
//     .expect('Content-Type', /application\/json/);

//   assert.strictEqual(postResponse.body.error, 'URL is required');
// });




// test('should delete a blog post by id', async () => {
//   const newBlog = {
//     title: 'Test Blog',
//     author: 'Test Author',
//     url: 'http://example.com',
//     likes: 0,
//   };

//   const createdBlog = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   await api
//     .delete(`/api/blogs/${createdBlog.body.id}`)
//     .expect(204);

//   const response = await api
//     .get(`/api/blogs/${createdBlog.body.id}`)
//     .expect(404)
//     .expect('Content-Type', /application\/json/);

//   assert.strictEqual(response.body.error, 'Blog not found');
// });



// test('should update the number of likes for a blog post', async () => {
//   // Create a new blog post
//   const newBlog = {
//     title: 'Update Blog',
//     author: 'Update Author',
//     url: 'http://example-update.com',
//     likes: 5,
//   };

//   const createdBlog = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   // Update the likes field
//   const updatedLikes = { likes: 10 };

//   const updatedBlog = await api
//     .put(`/api/blogs/${createdBlog.body.id}`)
//     .send(updatedLikes)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   // Validate the updated likes
//   assert.strictEqual(updatedBlog.body.likes, 10, 'Likes should be updated to 10');

//   // Fetch the blog and confirm the update
//   const response = await api
//     .get(`/api/blogs/${createdBlog.body.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   assert.strictEqual(response.body.likes, 10, 'Fetched blog should have updated likes as 10');
// });



test('should return 401 Unauthorized if no token is provided for creating a blog', async () => {
    const newBlog = {
      title: 'Blog Without Token',
      author: 'Author',
      url: 'http://example.com/no-token',
      likes: 0,
    };
  
    // Make the POST request without the token
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)  // Expect 401 Unauthorized
      .expect('Content-Type', /application\/json/);
  
    // Assert that the response contains the correct error message
    assert.strictEqual(postResponse.body.error, 'token missing or invalid');
  });
  





after(async () => {
  await mongoose.connection.close()
})

