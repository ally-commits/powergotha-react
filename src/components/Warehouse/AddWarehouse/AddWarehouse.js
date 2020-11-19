import React from 'react'
import styles from './AddWarehouse.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {withRouter} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'


import axios from 'axios'


const AddWarehouse = (props) => { 
    const [formData,setFormData] = React.useState({
        warehouseName: "",
        coordinates: [0,0]
    });

    const [error,setError] = React.useState({
        warehouseName: false,
        coordinates: [false,false]
    });

    const [loading,setLoading] = React.useState(false)

    const validate = () => {
        const err = {warehouseName: false,coordinates: [false,false]};
        let validData = true;
        setError({...err});
        if(formData.warehouseName == "") {
            err.warehouseName = "Name field cannot be empty"
            validData = false;
        }
        if(formData.coordinates[0] == 0) {
            err.coordinates[0] = "Enter Valid Latitude"
            validData = false;
        }
        if(formData.coordinates[1] == 0) {
            err.coordinates[1] = "Enter Valid Longitude"
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
                url: "/admin/warehouse/addWarehouse",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Warehouse Added Succesfully");
                props.getAllWarehouse()
                props.history.push("/admin/warehouse/VIEW-WAREHOUSE")
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
                <h1>Add Warehouse</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Warehouse Name"
                        className={styles.name}
                        value={formData.warehouseName}
                        onChange={e => setFormData({...formData,warehouseName: e.target.value})}
                        error={error.warehouseName}
                        helperText={error.warehouseName}
                    />

                    <TextField 
                        label="Latitude"
                        type="number"
                        className={styles.coord}
                        value={formData.coordinates[0]}
                        onChange={e => {
                            let coord = formData.coordinates;
                            coord[0] = e.target.value;
                            setFormData({...formData,coordinates: coord})
                        }}
                        error={error.coordinates[0]}
                        helperText={error.coordinates[0]}
                    />

                    <TextField 
                        label="Longitude"
                        type="number"
                        className={styles.coord}
                        value={formData.coordinates[1]}
                        onChange={e => {
                            let coord = formData.coordinates;
                            coord[1] = e.target.value;
                            setFormData({...formData,coordinates: coord})
                        }}
                        error={error.coordinates[1]}
                        helperText={error.coordinates[1]}
                    />
                </div>  
                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Warehouse</Button>}
                </div>
            </Paper>
        </div>
    )
} 
export default withRouter(connect(null,{showAlert,getAllWarehouse})(AddWarehouse));