import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
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


//Initially, the URL and likes should not be visible
const blogUrl = screen.queryByText(`URL: ${blog.url}`)
expect(blogUrl).not.toBeInTheDocument()

const blogLikes = screen.queryByText(`Likes: ${blog.likes}`)
expect(blogLikes).not.toBeInTheDocument()

//Find the "View" button and click it to show details
const toggleButton = screen.getByText('View')
fireEvent.click(toggleButton)

//Now, the URL and likes should be visible
expect(screen.getByText(`URL: ${blog.url}`)).toBeInTheDocument()
expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument()

//button text should change to "Hide"
expect(toggleButton).toHaveTextContent('Hide')
})
