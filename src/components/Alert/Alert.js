import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from 'react-redux';
import styles from './Alert.module.css'
import MuiAlert from '@material-ui/lab/Alert';
import { showAlert } from '../../containers/app/actions';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComp = (props) => {
    const [show,setShow] = React.useState(props.alertMsg);

    React.useEffect(() => { 
        setShow(props.alertMsg)
    },[props.alertMsg])

    return (
        <React.Fragment>
            {show && 
            <Snackbar open={show} onClose={() => props.showAlert(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={() =>  props.showAlert(false)} severity="info">
                    {show}
                </Alert>
            </Snackbar>}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    alertMsg: state.app.showAlert
})

export default connect(mapStateToProps,{showAlert})(AlertComp);