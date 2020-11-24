import React from 'react'
import styles from './Profile.module.css'
import profileImg from '../../../assets/img/profile.png'

import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import {connect} from 'react-redux';
import axios from 'axios'
import {showAlert} from '../../../containers/app/actions'
import PassTextField from '../../utils/PassTextField/PassTextField'
 

const Profile = (props) => {
    const [user,setUser] = React.useState({});
    const [formData,setFormData] = React.useState({
        oldPassword: "",
        newPassword: ""
    })

    const [error,setError] = React.useState({
        oldPassword: false,
        newPassword: false
    })

    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.auth) { 
            setUser(props.auth)
        }
    },[props.auth]); 

    const validate = () => {
        const err = {oldPassword: false,newPassword: false};
        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(formData[key].length < 8) {
                err[key] = `${key} should be mimimum 8 charactors`
                validData = false;
            } 
        })

        setError({...err});
        return validData;
    }
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "put",
                url: "/user/changePassword",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false) 
                props.showAlert("Password Updated Succesfully")
                setFormData({oldPassword: "",newPassword: ""})
            }).catch(err => {
                setLoading(false);
                if(err && err.response && err.response.data && err.response.data.error) {
                    props.showAlert(err.response.data.error)
                } else {
                    props.showAlert("Something went wrong ! Try Again")
                }
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

                        <PassTextField
                            className={styles.textField}
                            label="Enter Old Password"
                            value={formData.oldPassword}
                            error={error.oldPassword}
                            helperText={error.oldPassword}
                            onChange={(e) => setFormData({...formData,oldPassword: e.target.value})}
                            fullWidth
                        />
                        <PassTextField
                            className={styles.textField}
                            label="Enter New Password"
                            value={formData.newPassword}
                            error={error.newPassword}
                            helperText={error.newPassword}
                            onChange={(e) => setFormData({...formData,newPassword: e.target.value})}
                            fullWidth
                        />
                        
                        {loading
                            ?
                        <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                            :
                        <Button color="primary" variant="contained" startIcon={<EditRoundedIcon />} onClick={onSubmit}>Change Password</Button>}
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