import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { jest } from '@jest/globals'
import { test } from '@jest/globals'
import CreateBlog from './CreateBlog'

test('5.16: Form calls event handler with correct details when a new blog is created', () => {
  const mockHandleNewBlog = jest.fn()
  const mockUser = { token: 'test-token' }

  const { getByText, getByLabelText } = render(
    <CreateBlog user={mockUser} handleNewBlog={mockHandleNewBlog} />
  )

  // Fill out the form
  fireEvent.change(getByLabelText(/title/i), { target: { value: 'Test Blog' } })
  fireEvent.change(getByLabelText(/author/i), { target: { value: 'Test Author' } })
  fireEvent.change(getByLabelText(/url/i), { target: { value: 'http://testblog.com' } })

  // Submit the form
  fireEvent.click(getByText('Create'))

  // Ensure the event handler is called with the correct data
  expect(mockHandleNewBlog).toHaveBeenCalledTimes(1)
  expect(mockHandleNewBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
  })
})
