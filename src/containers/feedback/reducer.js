import * as actionTypes from './actionTypes'

const initialState = { 
  feedback: false,  
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_FEEDBACK_DATA:
            return {...state,feedback: action.payload} 
        default:
            return state
    }
}

export default reducer;