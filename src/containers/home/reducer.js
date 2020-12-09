import * as actionTypes from './actionTypes'

const initialState = { 
  data: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_DATA:
            return {...state,data: action.payload}
        default:
            return state
    }
}

export default reducer;