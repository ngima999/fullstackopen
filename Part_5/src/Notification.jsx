// Notification.jsx
import React from 'react';

const Notification = ({ notification }) => {
  if (!notification.message) return null;

  const notificationStyle = {
    color: 'white',
    background: notification.isError ? 'red' : 'lightgreen',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
