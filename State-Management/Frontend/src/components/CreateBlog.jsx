import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/notificationReducer';

const CreateBlog = ({ user, handleNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user || !user.token) {
      // Dispatch notification for error if user is not logged in
      dispatch(setNotification('User is not logged in!', true, 5000)); // Update to match setNotification
      return;
    }

    // Pass form data to the parent component or context instead of making a POST request
    handleNewBlog({ title, author, url });

    // Dispatch success notification
    dispatch(setNotification(`Blog "${title}" by ${author} added!`, false, 5000)); // Update to match setNotification

    // Reset form fields
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title: <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        URL: <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlog;
