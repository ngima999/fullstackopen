import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not URL or likes by default', () => {
  const blog = {
    title: 'React Testing',
    author: 'John Doe',
    url: 'https://reacttesting.com',
    likes: 10,
    user: { username: 'johndoe', name: 'John Doe' },
  }

  render(
    <Blog
      blog={blog}
      handleUpdateBlog={vi.fn()}
      showNotification={vi.fn()}
      handleDeleteBlog={vi.fn()}
    />
  )

  // Ensure title and author are visible
  const blogTitle = screen.getByText('React Testing')
  const blogAuthor = screen.getByText('John Doe')
  expect(blogTitle).toBeVisible()
  expect(blogAuthor).toBeVisible()

  // Ensure URL and likes are not rendered by default
  const blogUrl = screen.queryByText('URL: https://reacttesting.com')
  expect(blogUrl).not.toBeInTheDocument()

  const blogLikes = screen.queryByText('Likes: 10')
  expect(blogLikes).not.toBeInTheDocument()
})
