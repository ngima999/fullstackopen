import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Better Anecdotes!',
  reducers: {
    setNotification: (state, action) => action.payload
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
