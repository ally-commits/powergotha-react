import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from 'react-redux';
import styles from './Alert.module.css'
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComp = (props) => {
    const [show,setShow] = React.useState(false);

    React.useEffect(() => {
        if(props.showAlert) 
            setShow(props.showAlert)
    },[props.showAlert])

    return (
        <React.Fragment>
            {show && 
            <Snackbar open={show} autoHideDuration={5000} onClose={() =>setShow(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={() => setShow(false)} severity="info">
                    {show}
                </Alert>
            </Snackbar>}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    showAlert: state.app.showAlert
})

export default connect(mapStateToProps)(AlertComp);