import React from 'react'
import styles from './AddSubscription.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress' 
import IconButton from '@material-ui/core/IconButton' 
import Tooltip from '@material-ui/core/Tooltip';


import AddRoundedIcon from '@material-ui/icons/AddRounded'; 
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 
import {getAllSubscriptions} from '../../../containers/subscription/actions'
import {withRouter} from 'react-router-dom'
import axios from 'axios'  

import LANG from '../../../translator' 

const AddSubscription = (props) => { 
    const [formData,setFormData] = React.useState({
        name: "",
        points: [""],
        price: ""
    });

    const [error,setError] = React.useState({
        name: false,
        price: false
    });

    const [arrError,setArrError] = React.useState([false])

    const [loading,setLoading] = React.useState(false);  

    const onAddPoint = () => {
        let arr = formData.points;
        let arrErr = arrError;
        
        arrErr.push(false);
        arr.push("");
        
        setFormData({...formData,points: [...arr]})
        setArrError([...arrErr])
    }

    const onDeletePoint = (index) => {
        if(formData.points.length <= 1) {
            props.showAlert("Atleast 1 point should be added");
        } else {
            let arr = formData.points;
            let arrErr = arrError;
            
            arrErr = arrErr.filter((val,i) => index != i);
            arr = arr.filter((val,i) => index != i);
            
            setFormData({...formData,points: [...arr]})
            setArrError([...arrErr])
        }
    }

    const validate = () => {
        const err = {name: false,price: false};
        const arrErr = Array(formData.points.length).fill(false);
        
        setArrError({...arrErr});
        setError({...err});

        let validData = true;
        Object.keys(formData).forEach(key => {
            if(formData[key] == "") {
                err[key] = `Field cannot be empty`
                validData = false;
            } 
        }); 
        formData.points.forEach((point,index) => {
            if(point == "") {
                arrErr[index] = "Field cannot be empty"
                validData = false;
            }
        })

        setError({...err});
        setArrError([...arrErr]);
        return validData;
    }
 
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/subscription/addSubscription",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Subscription Added Succesfully");
                props.getAllSubscriptions()
                props.history.push("/admin/subscription/VIEW-SUBSCRIPTION")
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
                <h1>{LANG.ADD} {LANG.SUBSCRIPTION}</h1>

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
                        label={LANG.PRICE}
                        type="number"
                        className={styles.halfWidth}
                        value={formData.price}
                        onChange={e => setFormData({...formData,price: e.target.value})}
                        error={error.price}
                        helperText={error.price}
                    /> 
                </div>
                
                <div className={styles.header}>
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onAddPoint}>{LANG.ADD} {LANG.POINT}</Button>
                </div>

                <div className={styles.points}>
                    {formData.points.map((val,index) => {
                        return (
                            <div className={styles.textContent}>
                                <TextField 
                                    label={LANG.POINT + " " + (index + 1)}
                                    type="text"
                                    className={styles.halfWidth}
                                    value={val}
                                    onChange={e => {
                                        let arr = formData.points;
                                        arr[index] = e.target.value;
                                        setFormData({...formData,points: arr});
                                    }}
                                    error={arrError[index]}
                                    helperText={arrError[index]}
                                />  
                                <Tooltip title={LANG.DELETE}>
                                    <IconButton onClick={() => onDeletePoint(index)}>
                                        <CancelRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )
                    })}
                </div>  

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>{LANG.ADD} {LANG.SUBSCRIPTION}</Button>}
                </div>
            </Paper>
        </div>
    )
}  
export default withRouter(connect(null,{showAlert,getAllSubscriptions})(AddSubscription));