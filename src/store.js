// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import personsReducer from './reducers/personsReducer'
// import { createStore,  } from 'redux'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    persons: personsReducer
  }
})

// const reducer = combineReducers({
//   notes: notereducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

export default store