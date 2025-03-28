import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import userReducer  from "./userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
