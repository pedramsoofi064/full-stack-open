
const reducer = (state = '', action) => {

  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.payload

    default: return state
  }

}

export const updateFilter = (value) => {
  return {
    type: 'UPDATE_FILTER',
    payload: value
  }
}

export default reducer
