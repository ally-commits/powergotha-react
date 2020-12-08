import * as actionTypes from './actionTypes'

const initialState = { 
  users: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_USERS:
            return {...state,users: action.payload}
        default:
            return state
    }
}

export default reducer;