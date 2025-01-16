import React from 'react'
import '@testing-library/jest-dom'
import { test, expect } from '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest'

test('calls event handler twice when like button is clicked twice', () => {
  const blog = {
    title: 'React Testing',
    author: 'John Doe',
    url: 'https://reacttesting.com',
    likes: 10,
    user: { username: 'johndoe', name: 'John Doe' },
  };

  const mockHandleUpdateBlog = vi.fn()

  render(
    <Blog
      blog={blog}
      handleUpdateBlog={mockHandleUpdateBlog}
      showNotification={vi.fn()}
      handleDeleteBlog={vi.fn()}
    />
  )

  // Simulate expanding the blog details (if necessary)
  const viewButton = screen.getByText('View')
  fireEvent.click(viewButton)

  // Simulate clicking the like button twice
  const likeButton = screen.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  // Check that the mock function was called twice
  expect(mockHandleUpdateBlog).toHaveBeenCalledTimes(2)
})
