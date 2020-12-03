import React from 'react'
import styles from './EditUser.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress' 

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import {defaultProfilePicture} from '../../../config/config'
import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 

import {getAllUsers} from '../../../containers/enduser/actions'
import {withRouter, useLocation} from 'react-router-dom'
import axios from 'axios'  
import MediaHandler from '../../Media/MediaHandler'
import { Tooltip } from '@material-ui/core'

const EditUser = (props) => {
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        name: "",
        phoneNumber: "",
        email: "", 
        profilePicture: defaultProfilePicture
    });

    const [error,setError] = React.useState({
        name: false,
        phoneNumber: false,
        email: false, 
        profilePicture: false
    });

    React.useEffect(() => {
        if(props.userData) {
            if(query.get("userId")) {
                props.userData.users.forEach(user => {
                    if(user._id == query.get("userId")) { 
                        setFormData({...formData,...user,userId: user._id})
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/end-users/VIEW-END-USERS")
            }
        } else {
            props.getAllUsers();
        }
    },[props.userData])


    const [loading,setLoading] = React.useState(false);
    const [modal,setModal] = React.useState(false)

    const validate = () => {
        const err = {name: false,phoneNumber: false,email: false};
        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(formData[key] == "") {
                err[key] = `${key} field cannot be empty`
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
                url: "/end-user/editUser",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("User Updated Succesfully");
                props.getAllUsers()
                props.history.push("/admin/end-users/VIEW-END-USER")
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
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>Update User</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Name"
                        className={styles.halfWidth}
                        value={formData.name}
                        onChange={e => setFormData({...formData,name: e.target.value})}
                        error={error.name}
                        helperText={error.name}
                    /> 

                    <div className={styles.profile}>
                        <MediaHandler 
                            open={modal}
                            onClose={() => setModal(false)}
                            onSelectImage={url => {
                                setFormData({...formData,profilePicture: url})
                                setModal(false)
                            }}
                        />
                        <p>Profile Picture</p>
                        <Tooltip title="Change Profile">
                            <img src={formData.profilePicture} alt="" className={styles.profilePicture} onClick={() => setModal(true)}/>
                        </Tooltip>
                    </div>
                </div> 
                <div className={styles.row}> 
                    <TextField 
                        label="Email"
                        type="email"
                        className={styles.halfWidth}
                        value={formData.email}
                        onChange={e => setFormData({...formData,email: e.target.value})}
                        error={error.email}
                        helperText={error.email}
                    /> 
                    
                    <TextField 
                        label="Phone Number"
                        type="number"
                        className={styles.halfWidth}
                        value={formData.phoneNumber}
                        onChange={e => setFormData({...formData,phoneNumber: e.target.value})}
                        error={error.phoneNumber}
                        helperText={error.phoneNumber}
                    /> 
                </div> 

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>Update User</Button>}
                </div>
            </Paper>
        </div>
    )
}  

const mapStateToProps = state => ({
    userData: state.user.userData
})
export default withRouter(connect(mapStateToProps,{showAlert,getAllUsers})(EditUser));