import * as actionTypes from './actionTypes'

const initialState = { 
  showAlert: false, 
  auth: false,
  images: false,
} 
const reducer =  (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_IMAGE:
      let imgs = state.images;
      if(imgs)
        imgs.unshift(action.payload) 
      else
        imgs = [action.payload]
  
      return {...state,images: [...imgs]}
    case actionTypes.SET_AUTH:
      return {...state,auth: action.payload} 
    case actionTypes.SHOW_ALERT:
      return {...state,showAlert: action.payload}
    default:
      return state
  }
}

export default reducer;