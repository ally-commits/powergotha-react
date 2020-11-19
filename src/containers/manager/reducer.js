import * as actionTypes from './actionTypes'

const initialState = { 
  managers: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_MANAGERS:
            return {...state,managers: action.payload}
        default:
            return state
    }
}

export default reducer;