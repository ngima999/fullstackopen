import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification || !notification.message) {
    return null; // Do not render anything if there's no message
  }

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: notification.isError ? "lightcoral" : "lightgreen",
        border: "1px solid",
        borderRadius: "5px",
      }}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
