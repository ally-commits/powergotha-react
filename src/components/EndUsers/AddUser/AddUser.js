import React from 'react'
import styles from './AddUser.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import {defaultProfilePicture} from '../../../config/config'
import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 

import {getAllUsers} from '../../../containers/enduser/actions'
import {withRouter} from 'react-router-dom'
import axios from 'axios'  
import MediaHandler from '../../Media/MediaHandler'
import { Tooltip } from '@material-ui/core'

const AddUser = (props) => { 
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

    const [loading,setLoading] = React.useState(false);
    const [modal,setModal] = React.useState(false)

    const validate = () => {
        const err = {name: false,phoneNumber: false,email: false,profilePicture: false};
        let validData = true;
        setError({...err});
        Object.keys(formData).forEach(key => {
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
                method: "post",
                url: "/end-user/addUser",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("User Added Succesfully");
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
                <h1>Add User</h1>

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
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add User</Button>}
                </div>
            </Paper>
        </div>
    )
}  
export default withRouter(connect(null,{showAlert,getAllUsers})(AddUser));