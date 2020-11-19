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

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Images from './Images/Images'

import {connect} from 'react-redux'
import {getAllCategory} from '../../../containers/category/actions'

const AddProduct = (props) => {
    const [images,setImages] = React.useState([]);

    const [formData,setFormData] = React.useState({
        productName: "",
        productPrice: 0,
        categoryId: "",
        active: true,
        productImages: []
    })

    React.useEffect(() => {
        if(!props.category) {
            props.getAllCategory();
        }
    },[props.category]);

    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>Add Product</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Product Name"
                        className={styles.productName}
                    />

                    <TextField 
                        label="Product Price"
                        className={styles.productPrice}
                    />
                </div>

                <div className={styles.row}>
                    <FormControl className={styles.category}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel> 
                        <Select 
                            value="" 
                            label="Category"
                        >
                            {props.category && props.category.map(cat => {
                                return (
                                    <MenuItem value={cat._id}>{cat.categoryName}</MenuItem>
                                )
                            })} 
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        className={styles.switch}
                        control={<Switch checked={true} onChange={() => {}} color="primary" />}
                        label="Product Active"
                    /> 
                </div>

                <div className={styles.row}>
                    <Images 
                        images={images}
                        
                        onAddImage={(url) => {
                            let img = images;
                            img.push(url)
                            setImages([...img])
                        }}

                        onDeleteImage={(index) => {
                            let img = images;
                            img = img.filter((val,i) => i != index)
                            setImages([...img])
                        }}
                    />
                </div>

                <div className={styles.row}>
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />}>Add Product</Button>
                </div>
            </Paper>
        </div>
    )
}
const mapStateToProps = state => ({
    category: state.category.category
})
export default connect(mapStateToProps,{getAllCategory})(AddProduct);