import { combineReducers } from 'redux';  
import appReducer from './app/reducer'; 
import productReducer from './product/reducer'
import categoryReducer from './category/reducer'
import warehouseReducer from './warehouse/reducer'
import managerReducer from './manager/reducer'
import deliveryReducer from './delivery/reducer'
import ordersReducer from './orders/reducer'
import homeReducer from './home/reducer'

export default combineReducers({ 
  app: appReducer,
  product: productReducer,
  category: categoryReducer,
  warehouse: warehouseReducer,
  manager: managerReducer,
  delivery: deliveryReducer,
  orders: ordersReducer,
  home: homeReducer
});
