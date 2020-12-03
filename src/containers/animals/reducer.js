import * as actionTypes from './actionTypes'

const initialState = { 
  animalData: false, 
  animals: false
} 
const reducer =  (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.SET_ANIMAL_DATA:
            return {...state,animalData: action.payload}
        case actionTypes.SET_ANIMAL_DETAILS:
            return {...state,animals: action.payload}
        default:
            return state
    }
}

export default reducer;