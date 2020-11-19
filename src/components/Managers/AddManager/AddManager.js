import React from 'react'
import styles from './AddManager.module.css'

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

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {getAllManagers} from '../../../containers/manager/actions'
import {withRouter} from 'react-router-dom'
import axios from 'axios'  

const AddManager = (props) => { 
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
    });

    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(!props.warehouse) {
            props.getAllWarehouse();
        }
    },[props.warehouse])

    const validate = () => {
        const err = {name: false,phoneNumber: false,dob: false,password: false};
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
        })

        setError({...err});
        return validData;
    }
 
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/admin/manager/addManager",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Manager Added Succesfully");
                props.getAllManagers()
                props.history.push("/admin/managers/VIEW-MANAGERS")
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
                <h1>Add Manager</h1>

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

                    <Button 
                        color="primary" 
                        startIcon={<AddRoundedIcon />} 
                        onClick={() => {
                            let arr = formData.assignedWarehouse;
                            arr.push("");
                            setFormData({...formData,assignedWarehouse: arr})
                        }}
                        >Add Warehouse</Button>
                </div>
                <Divider />

                <div className={styles.rowWarehouse}>
                    {formData.assignedWarehouse.map((warehouse,index) => {
                        return (
                            <div className={styles.selectBlock} key={index}>
                                <Select
                                    className={styles.select}
                                    value={warehouse}
                                    onChange={(e) => {
                                        let arr = formData.assignedWarehouse;
                                        arr[index] = e.target.value;
                                        setFormData({...formData,assignedWarehouse: arr})
                                    }}
                                >
                                    {props.warehouse && props.warehouse.map(warehouse => {
                                        return(
                                            <MenuItem value={warehouse._id}>{warehouse.warehouseName}</MenuItem>
                                        )
                                    })}
                                </Select>

                                <IconButton onClick={() => {
                                    let arr = formData.assignedWarehouse;
                                    arr = arr.filter((val,i) => index != i);
                                    setFormData({...formData,assignedWarehouse: arr})
                                }}>
                                    <CancelRoundedIcon />
                                </IconButton>
                            </div>
                        )
                    })}  
                </div>  

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Manager</Button>}
                </div>
            </Paper>
        </div>
    )
} 

const mapStateToProps = state => ({
    warehouse: state.warehouse.warehouse
})
export default withRouter(connect(mapStateToProps,{showAlert,getAllWarehouse,getAllManagers})(AddManager));