// redux/userReducer.js

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

// Action creators
export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export default userReducer;
