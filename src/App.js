import React from 'react'; 
 
import styles from './styles/app.module.css';

import { ThemeProvider} from '@material-ui/core/styles'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"; 
import axios from 'axios'

import Login from './components/Login/Login';
import NavBar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';

import { backendUrl } from './config/config';
import {theme} from './theme/theme'

import ShowAlert from './components/Alert/Alert';
import BackDropLoader from './components/utils/BackDropLoader/BackDropLoader';

import {setAuth,showAlert} from './containers/app/actions'
import {connect} from 'react-redux' 
import TopBar from './components/TopBar/TopBar';
 
const hist = createBrowserHistory();

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

const Dashbaord = () => {
  return (
    <React.Fragment>
      <TopBar head="Dashboard" />
    </React.Fragment>
  )
}
const Products = () => {
  return (
    <React.Fragment>
      <TopBar head="Products" />
    </React.Fragment>
  )
}
const Users = () => {
  return (
    <React.Fragment>
      <TopBar head="Users" />
    </React.Fragment>
  )
}

const App = (props) => {
  const [loaded,setLoaded] = React.useState(false);

  
  React.useEffect(() => {
    if(localStorage.token) { 
      axios({
        method: "get",
        url: "/user/getUserDetails",
      }).then(res => {
        if(res.data.user.userType != "ADMIN") {
          props.showAlert("401: You don't have enough access")
        } else {
          props.setAuth({...res.data.user}) 
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

                <PrivateRoute exact path="/admin/home" component={Dashbaord} />
                <PrivateRoute exact path="/admin/products" component={Products} />
                <PrivateRoute exact path="/admin/users" component={Users} />

                <Redirect from="/" to="/admin/home" />
              </Switch> 
            </div> 
          </React.Fragment>}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default connect(null,{setAuth,showAlert})(App);
