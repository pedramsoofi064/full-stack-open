
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        visible: false,
        text: ''
    },
    reducers: {
        showNotification(state, action) {
            state.text = action.payload
            state.visible = true;
            return state
        },
        hideNotification(state) {
            state.visible = false;
            state.text = '';
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
