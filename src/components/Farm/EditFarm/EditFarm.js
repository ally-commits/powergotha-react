import React from 'react'
import styles from './EditFarm.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 

import {getFarmDetails} from '../../../containers/farm/actions'
import {withRouter,useLocation} from 'react-router-dom'
import axios from 'axios'  
import LANG from '../../../translator'
 

const EditFarm = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        farmName: "",
        pincode: "",
        totalArea: "", 
        address: "",
        userId: query.get("userId")
    });

    const [error,setError] = React.useState({
        farmName:false,
        pincode:false,
        totalArea:false, 
        address:false 
    });

    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.farms) {
            if(query.get("farmId")) {
                props.farms.forEach(farm => {
                    if(farm._id == query.get("farmId")) { 
                        setFormData({...formData,...farm,farmId: farm._id})
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/farms/VIEW-USER-DETAILS?userId=" + query.get("userId"))
            }
        } else {
            props.getFarmDetails(query.get("userId"));
        }
    },[props.farms])

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
                method: "put",
                url: "/farm/editFarm",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Farm Updated Succesfully");
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
                <h1>{LANG.EDIT} {LANG.FARM}</h1>

                <div className={styles.row}>
                    <TextField 
                        label={LANG.NAME}
                        className={styles.halfWidth}
                        value={formData.farmName}
                        onChange={e => setFormData({...formData,farmName: e.target.value})}
                        error={error.farmName}
                        helperText={error.farmName}
                    /> 
 
                    <TextField 
                        label={LANG.PINCODE}
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
                        label={LANG.TOTAL_AREA} 
                        type="number"
                        className={styles.halfWidth}
                        value={formData.totalArea}
                        onChange={e => setFormData({...formData,totalArea: e.target.value})}
                        error={error.totalArea}
                        helperText={error.totalArea}
                    /> 
                    
                    <TextField 
                        label={LANG.ADDRESS} 
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
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>{LANG.UPDATE} {LANG.FARM}</Button>}
                </div>
            </Paper>
        </div>
    )
}  
const mapStateToProps = state => ({
    farms: state.farm.farms
})
export default withRouter(connect(mapStateToProps,{showAlert,getFarmDetails})(EditFarm));