import * as actionTypes from './actionTypes'

const initialState = { 
  farmData: false, 
  farms: false
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_FARM_DATA:
            return {...state,farmData: action.payload}
        case actionTypes.SET_FARM_DETAILS:
            return {...state,farms: action.payload}
        default:
            return state
    }
}

export default reducer;