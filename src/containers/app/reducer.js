import * as actionTypes from './actionTypes'

const initialState = { 
  showAlert: false
} 
const reducer =  (state = initialState, action) => {
  switch (action.type) {  
    case actionTypes.SHOW_ALERT:
      return {...state,showAlert: action.payload}
    default:
      return state
  }
}

export default reducer;