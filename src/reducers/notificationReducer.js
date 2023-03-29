import { createSlice } from '@reduxjs/toolkit'

const initialState =null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification() {
      return initialState
    },
    createNotification(state, action) {
      const content = action.payload
      return `you created ${content}`
    },
    loginNotification() {
      return 'logged in'
    },
    loginErrorNotification() {
      return 'wrong credentials'
    },
    likeNotification(state, action) {
      const content = action.payload
      console.log('state2', JSON.parse(JSON.stringify(state)))
      return `you liked ${content}`
    },
    commentNotification(state, action) {
      const content = action.payload
      console.log('state2', JSON.parse(JSON.stringify(state)))
      return `you commented on ${content}`
    },
  }
})

export const { notification, createNotification, loginNotification, loginErrorNotification, likeNotification, commentNotification } = notificationSlice.actions

export default notificationSlice.reducer