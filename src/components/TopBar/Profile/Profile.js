import React from 'react'
import styles from './Profile.module.css'
import profileImg from '../../../assets/img/profile.png'

import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import {connect} from 'react-redux';
import axios from 'axios'
import {showAlert} from '../../../containers/app/actions'
 
const Profile = (props) => {
    const [user,setUser] = React.useState({});
    const [password,setPassword] = React.useState("");
    const [error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.auth) { 
            setUser(props.auth)
        }
    },[props.auth]); 

    const onSubmit = () => {
        setError(false)
        if(password.length < 8) {
            setError("Password Length Should atleast 8 charactor")
        } else {
            setLoading(true);

            axios({
                method: "post",
                url: "/updatePassword",
                data: {
                    contactNum: user.contactNum,
                    password
                }
            }).then(res => {
                setLoading(false)
                if(res.data.success) {
                    props.showAlert("Password Updated")
                    setPassword("")
                } else {
                    props.showAlert("Something went wrong,Try Again")
                }
            }).catch(err => {
                setLoading(false)
                props.showAlert("Something went wrong,Try Again")
            })
        }
    }
    return (
        <Dialog open={props.open} onClose={() => props.onClose()}>
            <div className={styles.container}>
                <CloseRoundedIcon  onClick={() => props.onClose()} className={styles.close} />

                <div className={styles.content}>
                    <h1>My Account</h1>
                    <img src={profileImg} alt="" className={styles.profileImg} />

                    <div className={styles.formContent}>
                        <TextField
                            className={styles.textField}
                            label="Name"
                            value={user.name}
                            fullWidth
                        />

                        <TextField
                            className={styles.textField}
                            label="Phone Number"
                            type="number"
                            value={user.phoneNumber}
                            fullWidth
                        />

                        <TextField
                            className={styles.textField}
                            label="User Type"
                            disabled
                            value={user.userType}
                            fullWidth
                        />

                        <TextField
                            className={styles.textField}
                            label="Enter New Password"
                            value={""}
                            fullWidth
                        />
                        
                        <button className={styles.updatePassword}>
                            Update Password
                            <EditRoundedIcon />
                        </button>
                    </div>
                     
                </div>
            </div>
        </Dialog>
    )
}
const mapStateToProps = state => ({
    auth: state.app.auth
})
export default connect(mapStateToProps,{showAlert})(Profile);