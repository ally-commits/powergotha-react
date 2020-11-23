import React from 'react'
import styles from './AddProduct.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import FormHelperText from '@material-ui/core/FormHelperText'

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Images from './Images/Images'

import {connect} from 'react-redux'
import {getAllCategory} from '../../../containers/category/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {getAllProducts} from '../../../containers/product/actions'
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const AddProduct = (props) => {
    const [formData,setFormData] = React.useState({
        productName: "",
        productPrice: 0,
        categoryId: "",
        active: true,
        warehouseId: "",
        stockLeft: "",
        productImages: []
    })

    const [error,setError] = React.useState({
        productName: false,
        productPrice: false,
        categoryId: false, 
        warehouseId: false,
        stockLeft: false,
    });
    const [loading,setLoading] = React.useState(false);
    const [warehouse,setWarehouse] = React.useState([])

    React.useEffect(() => {
        if(!props.category) {
            props.getAllCategory();
        }
        if(props.auth && props.auth.userType == "ADMIN") {
            if(!props.warehouse) {
                props.getAllWarehouse();
            } else {
                setWarehouse(props.warehouse)
            }
        } else {
            setWarehouse(props.auth.assignedWarehouse)
        }
    },[props.category,props.warehouse,props.auth]);

    const validate = () => {
        const err = {productName: false, productPrice: false, categoryId: false, warehouseId: false,stockLeft: false};
        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(formData[key] == "" || formData[key] == 0) {
                err[key] = `${key} field cannot be empty`
                validData = false;
            } 
        })

        if(formData.productImages.length == 0) {
            console.log("showed error")
            props.showAlert("Upload Atleast one Image")
            validData = false;
        }
        console.log(err)
        setError({...err});
        return validData;
    }

    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "post",
                url: "/dashboard/product/addProduct",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Product Added Succesfully");
                props.getAllProducts()
                props.history.push("/admin/product/VIEW-PRODUCTS")
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
                <h1>Add Product</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Product Name"
                        className={styles.productName}
                        value={formData.productName}
                        onChange={e => setFormData({...formData,productName: e.target.value})}
                        error={error.productName}
                        helperText={error.productName}
                    />

                    <TextField 
                        label="Product Price"
                        className={styles.typeNumber}
                        value={formData.productPrice}
                        onChange={e => setFormData({...formData,productPrice: e.target.value})}
                        error={error.productPrice}
                        helperText={error.productPrice}
                    />
                    <TextField 
                        label="Stock"
                        className={styles.typeNumber}
                        value={formData.stockLeft}
                        onChange={e => setFormData({...formData,stockLeft: e.target.value})}
                        error={error.stockLeft}
                        helperText={error.stockLeft}
                    />
                </div>

                <div className={styles.row}>
                    <FormControl className={styles.category} error={error.categoryId}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel> 
                        <Select 
                            value={formData.categoryId}
                            onChange={(e) =>setFormData({...formData,categoryId: e.target.value})} 
                            label="Category"
                        >
                            {props.category && props.category.map(cat => {
                                return (
                                    <MenuItem value={cat._id}>{cat.categoryName}</MenuItem>
                                )
                            })} 
                        </Select>
                        {error.categoryId &&
                        <FormHelperText>{error.categoryId}</FormHelperText>}
                    </FormControl>

                    <FormControl className={styles.category} error={error.warehouseId}>
                        <InputLabel id="demo-simple-select-label">Warehouse</InputLabel> 
                        <Select 
                            value={formData.warehouseId}
                            onChange={(e) =>setFormData({...formData,warehouseId: e.target.value})} 
                            label="Warehouse"
                        >
                            {warehouse && warehouse.map(warehouse => {
                                return (
                                    <MenuItem value={warehouse._id}>{warehouse.warehouseName}</MenuItem>
                                )
                            })} 
                        </Select>
                        {error.warehouseId &&
                        <FormHelperText>{error.warehouseId}</FormHelperText>}
                    </FormControl>

                    <FormControlLabel
                        className={styles.switch}
                        control={<Switch value={formData.active} onChange={(e) => setFormData({...formData,active: !formData.active})} color="primary" />}
                        label="Product Active"
                    /> 
                </div>

                <div className={styles.row}>
                    <Images 
                        images={formData.productImages}
                        
                        onAddImage={(url) => {
                            let img = formData.productImages;
                            img.push(url)
                            setFormData({...formData,productImages: img})
                        }}

                        onDeleteImage={(index) => {
                            let img = formData.productImages;
                            img = img.filter((val,i) => i != index)
                            setFormData({...formData,productImages: img})
                        }}
                    />
                </div>

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<AddRoundedIcon />} onClick={onSubmit}>Add Product</Button>}
                </div>
            </Paper>
        </div>
    )
}
const mapStateToProps = state => ({
    category: state.category.category,
    warehouse: state.warehouse.warehouse,
    auth: state.app.auth
})
export default withRouter(connect(mapStateToProps,{getAllCategory,getAllWarehouse,showAlert,getAllProducts})(AddProduct));