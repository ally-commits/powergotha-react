import React from 'react'
import styles from './AddCategory.module.css'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button' 
import Switch from '@material-ui/core/Switch' 

import AddRoundedIcon from '@material-ui/icons/AddRounded';


const AddCategory = () => { 
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>Add Category</h1>

                <div className={styles.row}>
                    <TextField 
                        label="Category Name"
                        className={styles.catName}
                    />
                    <TextField 
                        label="Category Description"
                        className={styles.catName}
                    />
 
                    <FormControlLabel
                        className={styles.switch}
                        control={<Switch checked={true} onChange={() => {}} color="primary" />}
                        label="Category Active"
                    /> 
                </div>

                <div className={styles.row}>
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />}>Add Category</Button>
                </div>
            </Paper>
        </div>
    )
}

export default AddCategory;