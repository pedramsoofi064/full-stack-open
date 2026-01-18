import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        ...state,
        visible: true,
        text: action.payload,
      }
    case 'HIDE':
      return {
        ...state,
        visible: false,
        text: '',
      }

    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    visible: false,
    text: '',
  })

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
