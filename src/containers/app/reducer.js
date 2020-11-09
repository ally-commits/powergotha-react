import * as actionTypes from './actionTypes'

const initialState = { 
  showAlert: false,
  users: false,
  auth: false
} 
const reducer =  (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state,auth: action.payload}
    case actionTypes.SET_USERS:
      return {...state,users: action.payload}  
    case actionTypes.SHOW_ALERT:
      return {...state,showAlert: action.payload}
    default:
      return state
  }
}

export default reducer;