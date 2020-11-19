import * as actionTypes from './actionTypes'

const initialState = { 
  warehouse: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_WAREHOUSE:
            return {...state,warehouse: action.payload}
        default:
            return state
    }
}

export default reducer;