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


const AddProduct = () => {
    const [images,setImages] = React.useState([]);

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
                            <MenuItem>Category 1</MenuItem>
                            <MenuItem>Category 2</MenuItem>
                            <MenuItem>Category 3</MenuItem>
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

export default AddProduct;