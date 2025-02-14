import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Better Anecdotes!',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => ''

  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Thunk to show notification for 5 seconds
export const showNotification = (message, timeoutInSeconds = 1) => {
    return (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeoutInSeconds * 1000)
    }
  }
  
export default notificationSlice.reducer
