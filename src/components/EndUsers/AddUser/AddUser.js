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
import PassTextField from '../../utils/PassTextField/PassTextField'
import LANG from '../../../translator'

const AddUser = (props) => { 
    const [formData,setFormData] = React.useState({
        name: "",
        phoneNumber: "",
        email: "", 
        profilePicture: defaultProfilePicture,
        password: ""
    });

    const [error,setError] = React.useState({
        name: false,
        phoneNumber: false,
        email: false, 
        profilePicture: false,
        password: false
    });

    const [loading,setLoading] = React.useState(false);
    const [modal,setModal] = React.useState(false)

    const validate = () => {
        const err = {name: false,phoneNumber: false,email: false,profilePicture: false,password: false};
        let validData = true;
        setError({...err});
        Object.keys(formData).forEach(key => {
            if(formData[key] == "") {
                err[key] = `Field cannot be empty`
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
                    if(err.response.data.error === "phoneNumber already exists"){
                         props.showAlert("Phone Number already exists")
                    }
                } else {
                    props.showAlert("Something went wrong ! Try Again")
                }
            })
        }
    }
 
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>{LANG.ADD} {LANG.FARMER}</h1>

                <div className={styles.row}>
                    <TextField 
                        label={LANG.NAME}
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
                        <p>{LANG.PICTURE}</p>
                        <Tooltip title={LANG.EDIT + " " + LANG.PICTURE}>
                            <img src={formData.profilePicture} alt="" className={styles.profilePicture} onClick={() => setModal(true)}/>
                        </Tooltip>
                    </div>
                </div> 
                <div className={styles.row}> 
                    <TextField 
                        label={LANG.EMAIL}
                        type="email"
                        className={styles.halfWidth}
                        value={formData.email}
                        onChange={e => setFormData({...formData,email: e.target.value})}
                        error={error.email}
                        helperText={error.email}
                    /> 
                    
                    <TextField 
                        label={LANG.PHONE_NUMEBR}
                        type="number"
                        className={styles.halfWidth}
                        value={formData.phoneNumber}
                        onChange={e => setFormData({...formData,phoneNumber: e.target.value})}
                        error={error.phoneNumber}
                        helperText={error.phoneNumber}
                    /> 

                    <PassTextField 
                        label={LANG.PASSWORD}
                        className={styles.halfWidth}
                        value={formData.password}
                        onChange={e => setFormData({...formData,password: e.target.value})}
                        error={error.password}
                        helperText={error.password}
                    /> 
                </div> 

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>{LANG.ADD} {LANG.FARMER}</Button>}
                </div>
            </Paper>
        </div>
    )
}  
export default withRouter(connect(null,{showAlert,getAllUsers})(AddUser));