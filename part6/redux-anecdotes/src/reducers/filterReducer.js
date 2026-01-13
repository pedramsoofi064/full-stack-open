
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { updateFilter } = filterSlice.actions

export default filterSlice.reducer
