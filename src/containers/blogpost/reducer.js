import * as actionTypes from './actionTypes'

const initialState = { 
  blogs: false, 
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_BLOGS:
            return {...state,blogs: action.payload}
        default:
            return state
    }
}

export default reducer;