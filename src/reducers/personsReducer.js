import { createSlice } from '@reduxjs/toolkit'

const initialState =[]
const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    setPersons(state, action) {
      state = action.payload
      console.log('persons', state)
      return state
    }
  }
})

export const { setPersons } = personsSlice.actions

export default personsSlice.reducer