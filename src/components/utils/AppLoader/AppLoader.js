import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './style.module.css' 

const AppLoader = () => {
    return ( 
        <div className={styles.container}> 
            <CircularProgress />
        </div> 
    )
}


export default AppLoader;