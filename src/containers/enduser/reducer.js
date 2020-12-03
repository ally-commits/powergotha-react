import * as actionTypes from './actionTypes'

const initialState = { 
  userData: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_USER_DATA:
            return {...state,userData: action.payload}
        default:
            return state
    }
}

export default reducer;