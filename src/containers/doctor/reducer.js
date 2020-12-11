import * as actionTypes from './actionTypes'

const initialState = { 
  doctors: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_DOCTORS:
            return {...state,doctors: action.payload}
        default:
            return state
    }
}

export default reducer;