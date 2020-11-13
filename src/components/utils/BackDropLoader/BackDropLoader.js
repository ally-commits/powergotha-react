import React from 'react';
import styles from './style.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const BackDropLoader = () => {
    return (
        <div className={styles.container}>
            <CircularProgress color="primary" />
        </div>
    )
}


export default BackDropLoader;