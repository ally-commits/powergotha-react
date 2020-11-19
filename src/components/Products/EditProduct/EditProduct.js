import React from 'react'
import styles from './EditProduct.module.css'

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

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import Images from './Images/Images'

import {connect} from 'react-redux'
import {getAllCategory} from '../../../containers/category/actions'
import {getAllWarehouse} from '../../../containers/warehouse/actions'
import {getAllProducts} from '../../../containers/product/actions'
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import {withRouter,useLocation} from 'react-router-dom'

const EditProduct = (props) => {
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        productName: "",
        productPrice: 0,
        categoryId: "",
        active: true,
        warehouseId: "",
        productImages: [],
        productId: ""
    })

    const [error,setError] = React.useState({
        productName: false,
        productPrice: false,
        categoryId: false, 
        warehouseId: false
    });
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.products) {
            if(query.get("productId")) {
                props.products.forEach(product => {
                    if(product._id == query.get("productId")) { 
                        setFormData({...formData,...product,productId: product._id,categoryId: product.categoryId._id,warehouseId: product.warehouseId._id})
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/product/VIEW-PRODUCTS")
            }
        } else {
            props.getAllProducts();
        }
    },[props.products]);

    React.useEffect(() => {
        if(!props.category) {
            props.getAllCategory();
        }
        if(!props.warehouse) {
            props.getAllWarehouse();
        }
    },[props.category,props.warehouse]);



    const validate = () => {
        const err = {productName: false, productPrice: false, categoryId: false, warehouseId: false};
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
                method: "put    ",
                url: "/dashboard/product/editProduct",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Product Updated Succesfully");
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

    console.log(formData)
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>Edit Product</h1>

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
                        className={styles.productPrice}
                        value={formData.productPrice}
                        onChange={e => setFormData({...formData,productPrice: e.target.value})}
                        error={error.productPrice}
                        helperText={error.productPrice}
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
                            {props.warehouse && props.warehouse.map(warehouse => {
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
                        control={<Switch checked={formData.active} onChange={(e) => setFormData({...formData,active: !formData.active})} color="primary" />}
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
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>Update Product</Button>}
                </div>
            </Paper>
        </div>
    )
}
const mapStateToProps = state => ({
    category: state.category.category,
    warehouse: state.warehouse.warehouse,
    products: state.product.products
})
export default withRouter(connect(mapStateToProps,{getAllCategory,getAllWarehouse,showAlert,getAllProducts})(EditProduct));