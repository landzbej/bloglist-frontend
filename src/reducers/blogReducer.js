import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addOne(state, action) {
      state = state.concat(action.payload)
      console.log('state', state)
      return state
    },
    deleteOne(state, action) {
      const id = action.payload
      const forDelete = state.find(obj => obj.id === id)
      const index = state.indexOf(forDelete)
      state.splice(index, 1)
      return state
    },
    likeOne(state, action) {
      const id = action.payload
      const forLike = state.find(obj => obj.id === id)
      const index = state.indexOf(forLike)
      state[index].likes += 1
      console.log(JSON.parse(JSON.stringify(state)))
      return state
    },
    commentOne(state, action) {
      const id = action.payload.id
      const content = action.payload.content
      const index = state.findIndex(object => {
        return object.id === id
      })
      console.log('added comment index', JSON.parse(JSON.stringify(index)))
      state[index].comments = state[index].comments.concat([content])
      console.log('added comment state', JSON.parse(JSON.stringify(state)))
      return state
    },
    loginNotification() {
      return 'logged in'
    },
    loginErrorNotification() {
      return 'wrong credentials'
    },
    likeNotification(state, action) {
      const content = action.payload
      return `you liked ${content}`
    },
  }
})

export const { setBlogs, addOne, deleteOne, likeOne, commentOne, notification, createNotification, loginNotification, loginErrorNotification, likeNotification } = blogSlice.actions

export default blogSlice.reducer