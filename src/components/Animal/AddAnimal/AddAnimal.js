import React from 'react'
import styles from './AddAnimal.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions' 

import {getFarmDetails} from '../../../containers/farm/actions'
import {getAnimalDetails,getAnimalUserList} from '../../../containers/animals/actions'
import {getAllCategory} from '../../../containers/category/actions'

import {withRouter,useLocation} from 'react-router-dom'
import axios from 'axios'  
import { Switch } from '@material-ui/core'

 

const AddAnimal = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        category: "",
        farm: "",
        animalBreed: "",
        dob: "",
        weight: "",
        animalType: "",
        tagNumber: "",
        pregnant: false,
        locatating: false,
        bornInDairyFarm: false,
        purchasingPrice: 0,
        userId: query.get("userId"), 
    });

    const [error,setError] = React.useState({
        category: false,
        farm: false,
        animalBreed: false,
        tagNumber: false,
        dob: false,
        weight: false,
        animalType: false, 
    });

    React.useEffect(() => {
        props.getAllCategory()
        props.getFarmDetails(query.get("userId"));
    },[])
    const [loading,setLoading] = React.useState(false);

    const validate = () => {
        const err = {category: false,farm: false,animalBreed: false,dob: false,weight: false,animalType: false,tagNumber: false};

        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(formData[key] == "") {
                err[key] = `${key} field cannot be empty`
                validData = false;
            }  
        })
        console.log(err)
        setError({...err});
        return validData;
    }
 
    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/animal/addAnimal",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Animal Added Succesfully");
                props.getAnimalUserList()
                props.getAnimalDetails(query.get("userId"))
                props.history.push("/admin/animals/VIEW-USER-DETAILS?userId=" + query.get("userId"))
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
                <h1>Add Animal</h1>

                <div className={styles.row}>

                    <FormControl className={styles.halfWidth} error={error.category}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel> 
                        <Select 
                            label="Select Animal Type"
                            value={formData.category}
                            onChange={e => setFormData({...formData,category: e.target.value})}
                        >
                            {props.category && props.category.map(cat => {
                                return (
                                    <MenuItem value={cat._id}>{cat.categoryName}</MenuItem>
                                )
                            })}
                        </Select>

                        {error.category &&
                        <FormHelperText>{error.category}</FormHelperText>}

                    </FormControl>


                    <FormControl className={styles.halfWidth} error={error.category}>
                        <InputLabel id="demo-simple-select-label">Farm</InputLabel> 
                        <Select  
                            label="Select Farm"
                            value={formData.farm}
                            onChange={e => setFormData({...formData,farm: e.target.value})}
                        >
                            {props.farms && props.farms.map(farm => {
                                return (
                                    <MenuItem value={farm._id}>{farm.farmName}</MenuItem>
                                )
                            })}
                        </Select>
                        {error.category &&
                            <FormHelperText>{error.category}</FormHelperText>}

                    </FormControl>

                    <TextField 
                        label="Animal Breed"
                        className={styles.halfWidth}
                        value={formData.animalBreed}
                        onChange={e => setFormData({...formData,animalBreed: e.target.value})}
                        error={error.animalBreed}
                        helperText={error.animalBreed}
                    /> 
                </div>
                <div className={styles.row}>
                    <TextField 
                        label="Animal Type" 
                        type="text"
                        className={styles.halfWidth}
                        value={formData.animalType}
                        onChange={e => setFormData({...formData,animalType: e.target.value})}
                        error={error.animalType}
                        helperText={error.animalType}
                    /> 
 
                    <TextField 
                        label="Date of birth"
                        type="date"
                        className={styles.halfWidth}
                        InputLabelProps={{ shrink: true, required: true }}
                        value={formData.dob}
                        onChange={e => setFormData({...formData,dob: e.target.value})}
                        error={error.dob}
                        helperText={error.dob}
                    /> 

                    <TextField 
                        label="Weight"
                        type="number"
                        className={styles.halfWidth}
                        value={formData.weight}
                        onChange={e => setFormData({...formData,weight: e.target.value})}
                        error={error.weight}
                        helperText={error.weight}
                    /> 
                </div> 

                <div className={styles.row}> 
                    <TextField 
                        label="Tag Number" 
                        type="number"
                        className={styles.halfWidth}
                        value={formData.tagNumber}
                        onChange={e => setFormData({...formData,tagNumber: e.target.value})}
                        error={error.tagNumber}
                        helperText={error.tagNumber}
                    /> 
                    
                    <div className={styles.switchWidth}>
                        <p>Pregnant</p>
                        <Switch 
                            checked={formData.pregnnant}
                            onChange={e => setFormData({...formData,pregnant: e.target.checked})}
                        />
                    </div>

                    <div className={styles.switchWidth}>
                        <p>Loctating</p>
                        <Switch 
                            checked={formData.loctating}
                            onChange={e => setFormData({...formData,loctating: e.target.checked})}
                        />
                    </div>

                    <div className={styles.switchWidth}>
                        <p>Born In Dairy</p>
                        <Switch 
                            checked={formData.bornInDairyFarm}
                            onChange={e => setFormData({...formData,bornInDairyFarm: e.target.checked})}
                        />
                    </div> 

                    <TextField 
                        label="Purchasing Price" 
                        type="number"
                        className={styles.halfWidth}
                        value={formData.purchasingPrice}
                        onChange={e => setFormData({...formData,purchasingPrice: e.target.value})}
                        error={error.purchasingPrice}
                        helperText={error.purchasingPrice}
                    /> 
                </div> 

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Animal</Button>}
                </div>
            </Paper>
        </div>
    )
}  

const mapStateToProps = state => ({
    category: state.category.category,
    farms: state.farm.farms
})
export default withRouter(connect(mapStateToProps,{showAlert,getFarmDetails,getAnimalDetails,getAllCategory})(AddAnimal));