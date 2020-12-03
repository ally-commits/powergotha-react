import React from 'react'
import styles from './AddFarm.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 

import {getFarmDetails,getFarmUserList} from '../../../containers/farm/actions'
import {withRouter,useLocation} from 'react-router-dom'
import axios from 'axios'  
 

const AddFarm = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        farmName: "",
        pincode: "",
        totalArea: "", 
        address: "",
        userId: query.get("userId"),
        farmId: query.get("farmId")
    });

    const [error,setError] = React.useState({
        farmName:false,
        pincode:false,
        totalArea:false, 
        address:false 
    });

    const [loading,setLoading] = React.useState(false);

    const validate = () => {
        const err = {farmName:false,pincode:false,totalArea:false, address:false};

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
                method: "post",
                url: "/farm/addFarm",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Farm Added Succesfully");
                props.getFarmUserList()
                props.getFarmDetails(query.get("userId"))
                props.history.push("/admin/farms/VIEW-USER-DETAILS?userId=" + query.get("userId"))
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
                <h1>Add Farm</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Farm Name"
                        className={styles.halfWidth}
                        value={formData.farmName}
                        onChange={e => setFormData({...formData,farmName: e.target.value})}
                        error={error.farmName}
                        helperText={error.farmName}
                    /> 
 
                    <TextField 
                        label="Pincode"
                        type="number"
                        className={styles.halfWidth}
                        value={formData.pincode}
                        onChange={e => setFormData({...formData,pincode: e.target.value})}
                        error={error.pincode}
                        helperText={error.pincode}
                    /> 
                </div> 

                <div className={styles.row}> 
                    <TextField 
                        label="Total Area" 
                        type="number"
                        className={styles.halfWidth}
                        value={formData.totalArea}
                        onChange={e => setFormData({...formData,totalArea: e.target.value})}
                        error={error.totalArea}
                        helperText={error.totalArea}
                    /> 
                    
                    <TextField 
                        label="Address" 
                        className={styles.halfWidth}
                        value={formData.address}
                        onChange={e => setFormData({...formData,address: e.target.value})}
                        error={error.address}
                        helperText={error.address}
                    /> 
                </div> 

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Farm</Button>}
                </div>
            </Paper>
        </div>
    )
}  
export default withRouter(connect(null,{showAlert,getFarmDetails,getFarmUserList})(AddFarm));