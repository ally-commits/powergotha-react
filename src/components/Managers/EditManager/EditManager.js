import React from 'react'
import styles from './EditManager.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {getAllManagers} from '../../../containers/manager/actions'
import {withRouter,useLocation} from 'react-router-dom'
import axios from 'axios' 


const EditManager = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

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
    },[props.warehouse]);


    React.useEffect(() => {
        if(props.managers) {
            if(query.get("userId")) {
                props.managers.forEach(manager => {
                    if(manager._id == query.get("userId")) {
                        let arr = manager.assignedWarehouse.map(val => val._id)
                        setFormData({...formData,...manager,userId: manager._id,assignedWarehouse: [...arr],dob: manager.dob.substring(0,10)})
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/managers/VIEW-MANAGERS")
            }
        } else {
            props.getAllManagers();
        }
    },[props.managers])

    const validate = () => {
        const err = {name: false,phoneNumber: false,dob: false,password: false};
        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(key != "assignedWarehouse" && formData[key] == "") {
                err[key] = `${key} field cannot be empty`
                validData = false;
            }
            if(key == "phoneNumber" && formData[key].length != 10) {
                err[key] = `Enter Valid Phone Number`
                validData = false;
            } 
        })
        console.log(err)
        setError({...err});
        return validData;
    }
 
    const onSubmit = () => {
        console.log("yeah")
        if(validate()) {
            console.log("yes")
            setLoading(true);

            axios({
                method: "put",
                url: "/admin/manager/editManager",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Manager Updated Succesfully");
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
                <h1>Edit Manager</h1>

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
                        format="yyyy/dd/mm"
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
                        disabled
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
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>Update Manager</Button>}
                </div>
            </Paper>
        </div>
    )
} 

const mapStateToProps = state => ({
    warehouse: state.warehouse.warehouse,
    managers: state.manager.managers
})
export default withRouter(connect(mapStateToProps,{showAlert,getAllWarehouse,getAllManagers})(EditManager));