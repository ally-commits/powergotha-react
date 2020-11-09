import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import styles from './style.module.css' 
const AppLoader = () => {
    return ( 
        <div className={styles.container}>
            <Spinner animation="grow" variant="primary" />
        </div> 
    )
}


export default AppLoader;