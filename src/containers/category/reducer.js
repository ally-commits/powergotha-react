import * as actionTypes from './actionTypes'

const initialState = { 
  category: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_CATEGORY:
            return {...state,category: action.payload}
        default:
            return state
    }
}

export default reducer;