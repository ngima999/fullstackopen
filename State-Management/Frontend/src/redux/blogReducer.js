

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      const updatedState = state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: action.data.likes } : blog
      );
      return updatedState.sort((a, b) => b.likes - a.likes);
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

// ✅ ADD THIS FUNCTION
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(); // Fetch blogs from the backend
    dispatch(setBlogs(blogs)); // Dispatch action to update Redux state
  };
};

export const setBlogs = (blogs) => ({
  type: "SET_BLOGS",
  data: blogs,
});

export const addBlog = (blog) => ({
  type: "ADD_BLOG",
  data: blog,
});

export const updateBlog = (blog) => ({
  type: "UPDATE_BLOG",
  data: blog,
});

export const deleteBlog = (id) => ({
  type: "DELETE_BLOG",
  data: id,
});

export default blogReducer;
