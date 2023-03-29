import { createSlice } from '@reduxjs/toolkit'

const initialState ='hello'
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state = action.payload
      console.log(JSON.parse(JSON.stringify(state)))
      return state
    },
    eraseUser() {
      return null
    },
    checkUser(state) {
      // state = action.payload
      console.log('user', JSON.parse(JSON.stringify(state)))
      return state
    },
  }
})

export const { addUser, eraseUser, checkUser } = userSlice.actions

export default userSlice.reducer