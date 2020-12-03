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
import Category from './containers/category/Category'; 
import EndUser from './containers/enduser/EndUser'; 
import Farm from './containers/farm/Farm'
import Animal from './containers/animals/Animal';
import BlogPost from './containers/blogpost/BlogPost';

import AdminRoute from './routes/AdminRoute'
import PrivateRoute from './routes/PrivateRoute'



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
        props.setAuth({...res.data.user}) 
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
                
                <AdminRoute exact path="/admin/category/:type" component={Category} />
                <AdminRoute exact path="/admin/end-users/:type" component={EndUser} />
                <AdminRoute exact path="/admin/farms/:type" component={Farm} />
                <AdminRoute exact path="/admin/animals/:type" component={Animal} />

                <PrivateRoute exact path="/user/blog-post/:type" component={BlogPost} />

              </Switch> 
            </div> 
          </React.Fragment>}
        </Router>
      </div>
    </ThemeProvider>
  );
} 

export default connect(null,{setAuth,showAlert})(App);
