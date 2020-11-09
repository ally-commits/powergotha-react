import React from 'react'; 

import './styles/custome.scss' 
import styles from './styles/app.module.css';

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"; 
import axios from 'axios'

import Login from './components/Login/Login';
import NavBar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import Home from './components/Home/Home';
import Professional from './components/Professionals/Professional';
import Passionists from './components/Passionists/Passionists';
import Transactions from './components/Transactions/Transactions';

import { backendUrl } from './config/config';
import ShowAlert from './components/Alert/Alert';
import BackDropLoader from './components/utils/BackDropLoader/BackDropLoader';

import {setAuth} from './containers/app/actions'
import {connect} from 'react-redux'

axios.interceptors.request.use(async (config) => {
  config.url = backendUrl + config.url

  return config
});
 
const hist = createBrowserHistory();

const App = (props) => {
  const [loaded,setLoaded] = React.useState(false );

  React.useEffect(() => {
    if(localStorage.user) {
      axios({
        method: "post",
        url: "/getUserDetails",
        data: {
          userId: localStorage.getItem("user")
        }
      }).then(res => {
        if(res.data.success) {
          props.setAuth(res.data.data);
          setTimeout(() => setLoaded(true),1000);
        }   
      }).catch(res => {
        setLoaded(true)
      })
    } else {
      setLoaded(true);
    }
 
  },[]);

  return (
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

              <PrivateRoute path="/admin/home" component={Home} />
              <PrivateRoute path="/admin/professionals" component={Professional} />
              <PrivateRoute path="/admin/passionists" component={Passionists} />
              <PrivateRoute path="/admin/transactions" component={Transactions} />

              <Redirect from="/" to="/admin/home" />
            </Switch> 
          </div> 
        </React.Fragment>}
      </Router>
    </div>
  );
}

export default connect(null,{setAuth})(App);
