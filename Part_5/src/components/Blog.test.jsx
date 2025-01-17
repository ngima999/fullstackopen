import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Blog from './Blog';

describe('Blog Component', () => {
  it('like button clicked twice, event handler is called twice', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Author Name',
      likes: 0,
      id: 1,
      user: {
        username: 'testuser',
      },
    };

    const handleUpdateBlog = vi.fn();
    const showNotification = vi.fn();

    const { getByText } = render(
      <Blog
        blog={blog}
        handleUpdateBlog={handleUpdateBlog}
        handleDeleteBlog={vi.fn()}
        showNotification={showNotification}
        authorizedUser={{
          username: 'testuser',
        }}
      />
    );

    // Find and click the toggle details button (View)
    const toggleDetailsButton = getByText('View');
    fireEvent.click(toggleDetailsButton);

    // Ensure the like button is visible and simulate clicking the like button twice
    const likeButton = await screen.findByText('Like');  // Use findByText for async rendering
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // Ensure the event handler is called twice
    expect(handleUpdateBlog).toHaveBeenCalledTimes(2);
  });
});
