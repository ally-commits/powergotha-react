import { combineReducers } from 'redux';   

import categoryReducer from './category/reducer' 
import appReducer from './app/reducer'
import userReducer from './enduser/reducer'
import farmReducer from './farm/reducer'
import animalReducer from './animals/reducer'

export default combineReducers({  
  category: categoryReducer, 
  app: appReducer,
  user: userReducer,
  farm: farmReducer,
  animal: animalReducer
});
