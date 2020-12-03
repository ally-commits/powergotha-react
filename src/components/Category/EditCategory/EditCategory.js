import React from 'react'
import styles from './EditCategory.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button' 
import Switch from '@material-ui/core/Switch' 
import CircularProgress from '@material-ui/core/CircularProgress'

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import {connect} from 'react-redux'
import {getAllCategory} from '../../../containers/category/actions' 
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import {withRouter,useLocation} from 'react-router-dom'


const EditCategory = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        categoryName: "", 
        categoryId: ""
    });

    const [error,setError] = React.useState({
        categoryName: false, 
    });

    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.category) {
            if(query.get("categoryId")) {
                props.category.forEach(cat => {
                    if(cat._id == query.get("categoryId")) { 
                        setFormData({...formData,...cat,categoryId: cat._id})
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/category/VIEW-CATEGORY")
            }
        } else {
            props.getAllCategory();
        }
    },[props.category]);

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
                method: "put",
                url: "/animal-category/editCategory",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Category Updated Succesfully");
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
                <h1>Edit Animal Category</h1>

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
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>Update Animal Category</Button>}
                </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    category: state.category.category
})
export default withRouter(connect(mapStateToProps,{getAllCategory,showAlert})(EditCategory));