const Notification = ({ notification }) => {
    if (!notification.message) return null;
  
    const notificationStyle = {
      color: notification.type === 'success' ? 'green' : 'red',
      background: 'lightgray',
      fontSize: '20px',
      border: `2px solid ${notification.type === 'success' ? 'green' : 'red'}`,
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    };
  
    return <div style={notificationStyle}>{notification.message}</div>;
  };
  
  export default Notification;
  