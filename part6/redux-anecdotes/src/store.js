import { configureStore } from '@reduxjs/toolkit'

import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationSlice
  }
})

export default store;

