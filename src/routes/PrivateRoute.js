import React from 'react'; 
import {Route}  from 'react-router-dom';


const PrivateRoute = (props) => {
    const [auth, setAuth] = React.useState(true);
    const [loaded, setLoaded] = React.useState(true);
    React.useEffect(() => {
         
    },[]); 
    return (
        <>
            {loaded && auth &&
            <Route
                {...props}
                component={props.component} /> } 
        </>
    );
} 
export default PrivateRoute;
  