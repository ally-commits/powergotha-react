import { combineReducers } from 'redux';  
import appReducer from './app/reducer'; 
import productReducer from './product/reducer'
import categoryReducer from './category/reducer'

export default combineReducers({ 
  app: appReducer,
  product: productReducer,
  category: categoryReducer
});
