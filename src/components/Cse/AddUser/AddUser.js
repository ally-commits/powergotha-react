import React from 'react'
import styles from './AddUser.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem' 
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import AddRoundedIcon from '@material-ui/icons/AddRounded'; 

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 
import {getAllUsers} from '../../../containers/cse/actions'
import {withRouter} from 'react-router-dom'
import axios from 'axios'  

import LANG from '../../../translator'

const AddUser = (props) => { 
    const [formData,setFormData] = React.useState({
        name: "",
        phoneNumber: "",
        userType: "CSE",
        password: "", 
        email: ""
    });

    const [error,setError] = React.useState({
        name: false,
        phoneNumber: false,
        userType: false,
        password: false,  
        email: false
    });

    const [loading,setLoading] = React.useState(false);  

    const validate = () => {
        const err = {name: false,phoneNumber: false,userType: false,password: false,email: false};
        let validData = true;
        setError({...err});
        Object.keys(formData).forEach(key => {
            if(formData[key] == "") {
                err[key] = `Field cannot be empty`
                validData = false;
            } 
        }); 

        setError({...err});
        return validData;
    }
 
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/cse/addUser",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("User Added Succesfully");
                props.getAllUsers()
                props.history.push("/admin/cse/VIEW-CSE")
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
                <h1>{LANG.ADD} {LANG.CSE}</h1>

                <div className={styles.row}>
                    <TextField 
                        label={LANG.NAME}
                        className={styles.halfWidth}
                        value={formData.name}
                        onChange={e => setFormData({...formData,name: e.target.value})}
                        error={error.name}
                        helperText={error.name}
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
                        label={LANG.PASSWORD}
                        type="password"
                        className={styles.halfWidth}
                        value={formData.password}
                        onChange={e => setFormData({...formData,password: e.target.value})}
                        error={error.password}
                        helperText={error.password}
                    /> 
                </div> 
        
                <div className={styles.row}>
                    <FormControl className={styles.halfWidth} error={error.category}>
                        <InputLabel id="demo-simple-select-label">{LANG.TYPE}</InputLabel> 
                        <Select 
                            label="Select User Type"
                            value={formData.userType}
                            onChange={e => setFormData({...formData,userType: e.target.value})}
                        > 
                            <MenuItem value="CSE">{LANG.CSE}</MenuItem>    
                            <MenuItem value="ADMIN">{LANG.ADMIN}</MenuItem>    
                        </Select>

                        {error.category &&
                        <FormHelperText>{error.category}</FormHelperText>}

                    </FormControl>
                </div>

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>{LANG.ADD} {LANG.CSE}</Button>}
                </div>
            </Paper>
        </div>
    )
}  
export default withRouter(connect(null,{showAlert,getAllUsers})(AddUser));