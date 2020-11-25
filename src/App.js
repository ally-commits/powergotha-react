import React from 'react'; 
 
import styles from './styles/app.module.css';

import { ThemeProvider} from '@material-ui/core/styles'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"; 
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/storage'

import { backendUrl } from './config/config';
import {theme} from './theme/theme'
import {firebaseConfig} from './config/config'

import {setAuth,showAlert} from './containers/app/actions'
import {connect} from 'react-redux' 

import ShowAlert from './components/Alert/Alert';
import BackDropLoader from './components/utils/BackDropLoader/BackDropLoader';

import Login from './components/Login/Login';
import NavBar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import TopBar from './components/TopBar/TopBar';
import Category from './containers/category/Category';
import Warehouse from './containers/warehouse/Warehouse';
import Product from './containers/product/Product'
import Manager from './containers/manager/Manager'
import Delivery from './containers/delivery/Delivery';
import AdminRoute from './routes/AdminRoute';
import Orders from './containers/orders/Orders';
import Home from './containers/home/Home';
import Map from './containers/map/Map';

const hist = createBrowserHistory();

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()

axios.interceptors.request.use(async (config) => {
  config.url = backendUrl + config.url

  if(localStorage.token) {
    config.headers = {
      ...config.headers,
      "Authorization": localStorage.getItem("token")
    }
  }
  return config
});
 
 

const App = (props) => {
  const [loaded,setLoaded] = React.useState(false);
  const [auth,setAuth] = React.useState(props.auth);

  React.useEffect(() => {
    setAuth(props.auth)
  },[props.auth])
  
  React.useEffect(() => {
    if(localStorage.token) { 
      axios({
        method: "get",
        url: "/user/getUserDetails",
      }).then(res => {
        if(res.data.user.userType == "ADMIN" || res.data.user.userType == "MANAGER") {
          props.setAuth({...res.data.user}) 
        } else {
          localStorage.clear();
          props.showAlert("401: You don't have enough access")
        }
        setLoaded(true);  
      })
      .catch(err => {
        if(err && err.response) 
          props.showAlert(err.response.data.error)
        else 
          props.showAlert("Something went wrong Try Again")

        setLoaded(true);
      })
    } else {
      setLoaded(true);
    }
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.appContainer}>
        <Router history={hist}> 
          {!loaded 
            ? 
          <BackDropLoader />
            :
          <React.Fragment>
            <ShowAlert />
            <div className={styles.navContainer}>
              <NavBar />
            </div>
            <div className={styles.mainContainer}>
              <Switch>  
                <Route exact path="/login" component={Login} />

                <PrivateRoute exact path="/admin/home" component={Home} />
                <PrivateRoute exact path="/admin/product/:type" component={Product} />
                <PrivateRoute exact path="/admin/category/:type" component={Category} />
                <PrivateRoute exact path="/admin/delivery/:type" component={Delivery} />
                <PrivateRoute exact path="/admin/orders/:type" component={Orders} />
 
                <AdminRoute exact path="/admin/warehouse/:type" component={Warehouse} />
                <AdminRoute exact path="/admin/managers/:type" component={Manager} />
                <AdminRoute exact path="/admin/view-map" component={Map} />

                <Redirect from="/" to="/admin/home" />
              </Switch> 
            </div> 
          </React.Fragment>}
        </Router>
      </div>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({
  auth: state.app.auth
})
export default connect(null,{setAuth,showAlert})(App);
