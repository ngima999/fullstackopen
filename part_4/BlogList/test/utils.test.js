const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

const blogs = [
  { title: 'Blog 1', author: 'Author 1', likes: 5 },
  { title: 'Blog 2', author: 'Author 2', likes: 10 },
  { title: 'Blog 3', author: 'Author 3', likes: 7 }
]

describe('dummy', () => {
  test('returns 1', () => {
    assert.strictEqual(dummy(blogs), 1)
  })
})

describe('totalLikes', () => {
  test('of an empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  test('of a list with blogs is calculated correctly', () => {
    assert.strictEqual(totalLikes(blogs), 22)
  })
})


describe('favoriteBlog', () => {
  test('of a list with blogs is the one with the most likes', () => {
    const mostLikedBlog = favoriteBlog(blogs)
    console.log('Most liked blog:', mostLikedBlog)

    assert.deepStrictEqual(favoriteBlog(blogs), { title: 'Blog 2', author: 'Author 2', likes: 10 })
  })
})


describe('mostBlogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 1', likes: 7 },
      { title: 'Blog 4', author: 'Author 3', likes: 3 },
      { title: 'Blog 5', author: 'Author 2', likes: 4 }
    ];
  
    test('returns the author with the most blogs', () => {
      const result = mostBlogs(blogs);
      console.log('Most blogs author:', result);
  
      // The expected result should be 'Author 1' with 2 blogs.
      assert.deepStrictEqual(result, { author: 'Author 1', blogs: 2 });
    });
  
    test('returns the correct author when there are multiple top authors', () => {
      const blogsWithSameCount = [
        { title: 'Blog 1', author: 'Author 1', likes: 5 },
        { title: 'Blog 2', author: 'Author 2', likes: 10 },
        { title: 'Blog 3', author: 'Author 1', likes: 7 },
        { title: 'Blog 4', author: 'Author 2', likes: 3 }
      ];
  
      const result = mostBlogs(blogsWithSameCount);
      console.log('Most blogs author:', result);
  
      // The expected result can be either 'Author 1' or 'Author 2', both with 2 blogs.
      assert.ok(result.author === 'Author 1' || result.author === 'Author 2');
      assert.strictEqual(result.blogs, 2);
    });
  });
  

  describe('mostLikes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 1', likes: 7 },
      { title: 'Blog 4', author: 'Author 3', likes: 3 }
    ];
  
    test('returns the author with the most likes', () => {
      assert.deepStrictEqual(mostLikes(blogs), { author: 'Author 1', likes: 12 });
    });
  });


