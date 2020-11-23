import * as actionTypes from './actionTypes'

const initialState = { 
  orders: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_ORDERS:
            return {...state,orders: action.payload}
        default:
            return state
    }
}

export default reducer;