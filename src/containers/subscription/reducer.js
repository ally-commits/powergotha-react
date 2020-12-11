import * as actionTypes from './actionTypes'

const initialState = { 
  subscriptions: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_SUBSCRIPTION:
            return {...state,subscriptions: action.payload}
        default:
            return state
    }
}

export default reducer;