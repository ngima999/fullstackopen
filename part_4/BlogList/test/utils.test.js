const { test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []  // Passing an empty array, but the function should always return 1

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)  // Verify that the function returns 1
})
