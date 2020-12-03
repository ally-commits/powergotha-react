import React from 'react'
import styles from './AddCategory.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button' 
import Switch from '@material-ui/core/Switch' 
import CircularProgress from '@material-ui/core/CircularProgress'

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {connect} from 'react-redux'
import {getAllCategory} from '../../../containers/category/actions' 
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import {withRouter} from 'react-router-dom'


const AddCategory = (props) => { 
    const [formData,setFormData] = React.useState({
        categoryName: "", 
    });

    const [error,setError] = React.useState({
        categoryName: false, 
    });

    const [loading,setLoading] = React.useState(false);

    const validate = () => {
        const err = {categoryName: false};
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
                url: "/animal-category/addCategory",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Category Added Succesfully");
                props.getAllCategory()
                props.history.push("/admin/category/VIEW-CATEGORY")
            }).catch(err => {
                setLoading(false);
                if(err && err.response && err.response.data && err.response.data.error) {
                    props.showAlert(err.response.data.error)
                } else {
                    console.log(err);   
                    props.showAlert("Something went wrong ! Try Again")
                }
            })
        }
    }
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>Add Animal Category</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Category Name"
                        className={styles.catName}
                        value={formData.categoryName}
                        onChange={e => setFormData({...formData,categoryName: e.target.value})}
                        error={error.categoryName}
                        helperText={error.categoryName}
                    /> 
                </div>

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Animal Category</Button>}
                </div>
            </Paper>
        </div>
    )
}

export default withRouter(connect(null,{getAllCategory,showAlert})(AddCategory));