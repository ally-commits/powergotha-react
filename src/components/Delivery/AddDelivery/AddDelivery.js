import React from 'react'
import styles from './AddDelivery.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {getAllUsers} from '../../../containers/delivery/actions'
import {withRouter} from 'react-router-dom'
import axios from 'axios'  

const AddDelivery = (props) => { 
    const [formData,setFormData] = React.useState({
        name: "",
        phoneNumber: "",
        dob: "",
        password: "",
        assignedWarehouse: [""]
    });

    const [error,setError] = React.useState({
        name: false,
        phoneNumber: false,
        dob: false,
        password: false, 
        assignedWarehouse: false
    });

    const [loading,setLoading] = React.useState(false);
    const [warehouse,setWarehouse] = React.useState([])

    React.useEffect(() => {
        if(props.auth && props.auth.userType == "ADMIN") {
            if(!props.warehouse) {
                props.getAllWarehouse();
            } else {
                setWarehouse(props.warehouse)
            }
        } else {
            setWarehouse(props.auth.assignedWarehouse)
        }
    },[props.warehouse,props.auth])

    const validate = () => {
        const err = {name: false,phoneNumber: false,dob: false,password: false,assignedWarehouse:false};
        let validData = true;
        setError({...err});
        Object.keys(formData).forEach(key => {
            if(key != "assignedWarehouse" && formData[key] == "") {
                err[key] = `${key} field cannot be empty`
                validData = false;
            }
            if(key == "phoneNumber" && formData[key].length != 10) {
                err[key] = `Enter Valid Phone Number`
                validData = false;
            }
            if(key == "password" && formData[key].length < 8) {
                err[key] = `Password should be atleast 8 charactor`
                validData = false;
            }
        });
        if(formData.assignedWarehouse[0] == "") {
            err.assignedWarehouse = "Assign a warehouse to continue";
            validData = false;
        }

        setError({...err});
        return validData;
    }
 
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/dashboard/delivery/addUser",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("User Added Succesfully");
                props.getAllUsers()
                props.history.push("/admin/delivery/VIEW-DELIVERY")
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
                <h1>Add Delivery</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Name"
                        className={styles.halfWidth}
                        value={formData.name}
                        onChange={e => setFormData({...formData,name: e.target.value})}
                        error={error.name}
                        helperText={error.name}
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
                    <TextField 
                        label="Date Of Birth"
                        type="date"
                        InputLabelProps={{ shrink: true, required: true }}
                        className={styles.halfWidth}
                        value={formData.dob}
                        onChange={e => setFormData({...formData,dob: e.target.value})}
                        error={error.dob}
                        helperText={error.dob}
                    /> 
                    <TextField 
                        label="Password"
                        type="password"
                        className={styles.halfWidth}
                        value={formData.password}
                        onChange={e => setFormData({...formData,password: e.target.value})}
                        error={error.password}
                        helperText={error.password}
                    /> 
                </div> 

                <div className={styles.info}>
                    <p>Assigned Warehouse</p> 
                </div>
                <Divider />

                <div className={styles.selectBlock}>
                    <FormControl className={styles.select} error={error.assignedWarehouse}>
                        <InputLabel id="demo-simple-select-label">Assigned Warehouse</InputLabel> 
                        <Select
                            value={formData.assignedWarehouse[0]}
                            onChange={(e) => {
                                let arr = formData.assignedWarehouse;
                                arr[0] = e.target.value;
                                setFormData({...formData,assignedWarehouse: arr})
                            }}
                        >
                            {warehouse && warehouse.map(warehouse => {
                                return(
                                    <MenuItem value={warehouse._id}>{warehouse.warehouseName}</MenuItem>
                                )
                            })}
                        </Select>

                        {error.assignedWarehouse &&
                        <FormHelperText>{error.assignedWarehouse}</FormHelperText>}
                    </FormControl> 
                </div> 

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Delivery</Button>}
                </div>
            </Paper>
        </div>
    )
} 

const mapStateToProps = state => ({
    warehouse: state.warehouse.warehouse,
    auth: state.app.auth
})
export default withRouter(connect(mapStateToProps,{showAlert,getAllWarehouse,getAllUsers})(AddDelivery));