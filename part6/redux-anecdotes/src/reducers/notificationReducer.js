
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

const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (text, secondsToVisible = 5) => {
    return async (dispatch) => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, secondsToVisible * 1000);
    }
}
export default notificationSlice.reducer
