import * as actionTypes from './actionTypes'

const initialState = { 
  products: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_PRODUCTS:
            return {...state,products: action.payload}
        default:
            return state
    }
}

export default reducer;