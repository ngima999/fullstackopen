const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

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


