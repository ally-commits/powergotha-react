import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {connect} from 'react-redux';
import styles from './Alert.module.css'

const AlertComp = (props) => {
    const [show,setShow] = React.useState(false);

    React.useEffect(() => {
        setShow(props.showAlert)
    },[props.showAlert])

    return (
        <React.Fragment>
            {show &&
                <div className={styles.container}>
                    <Alert variant={"info"} dismissible onClose={() => setShow(false)}>
                        {show}
                    </Alert>
                </div>}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    showAlert: state.app.showAlert
})

export default connect(mapStateToProps)(AlertComp);