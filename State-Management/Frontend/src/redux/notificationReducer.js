// notificationReducer.js
const initialState = { message: "", isError: false };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.payload.message,
        isError: action.payload.isError,
      };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

// Action Creators
export const setNotification = (message, isError = false, duration = 5000) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", payload: { message, isError } });

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, duration);
  };
};

export default notificationReducer;
