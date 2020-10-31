import React from 'react'; 
import axios from 'axios'

import './styles/custome.scss'

// import { ThemeProvider} from '@material-ui/core/styles'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// import firebase from 'firebase/app'
// import 'firebase/storage'
import BackDropLoader from './components/utils/BackDropLoader/BackDropLoader'


// import Login from './components/auth/login/Login'
// import Register from './components/auth/register/Register'
// import Admin from './layout/Admin' 

// import { backendUrl } from './config/keys';


import styles from './styles/app.module.css';
import Login from './components/Login/Login';
import NavBar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import Home from './components/Home/Home';
import Professional from './components/Professionals/Professional';
import Passionists from './components/Passionists/Passionists';


// import {theme} from './theme/theme'
// import {firebaseConfig} from './config/keys'

// import {setUser} from './containers/app/actions';
// import {connect} from 'react-redux'; 
// import BackDrop from './components/utils/BackDrop/BackDrop';

// firebase.initializeApp(firebaseConfig);
// export const storage = firebase.storage()


// axios.interceptors.request.use(async (config) => {
//   config.url = backendUrl + config.url

//   return config
// });
 


const hist = createBrowserHistory();

const App = (props) => {
  const [loaded,setLoaded] = React.useState(false);

  React.useEffect(() => {
     
  },[]);

  return (
    <div className={styles.appContainer}>
      <Router history={hist}> 
        <div className={styles.navContainer}>
          <NavBar />
        </div>
        <div className={styles.mainContainer}>
          
              <Switch>  
                <Route exact path="/login" component={Login} />

                <PrivateRoute path="/admin/home" component={Home} />
                <PrivateRoute path="/admin/professionals" component={Professional} />
                <PrivateRoute path="/admin/passionists" component={Passionists} />

                <Redirect from="/" to="/login" />
              </Switch> 
        </div> 
      </Router>
    </div>
  );
}

export default App;
