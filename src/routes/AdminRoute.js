import React from 'react'; 
import {Route}  from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

const AdminRoute = (props) => {
    const [auth, setAuth] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if(props.auth && props.auth.userType == "ADMIN") {
            setAuth(true)
            setLoaded(true)
        } else {
            setLoaded(true)
            props.history.push("/login")
        }
    },[props.auth]); 

    return (
        <React.Fragment>
            {loaded && auth &&
            <Route
                {...props}
                component={props.component} /> } 
        </React.Fragment>
    );
} 
const mapStateToProps = state => ({
    auth: state.app.auth
})
export default withRouter(connect(mapStateToProps)(AdminRoute));
  