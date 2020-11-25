import React from 'react';
import styles from './Map.module.css';
 
import TopBar from '../../components/TopBar/TopBar';
import MapComp from '../../components/Map/MapComp'

const Map = (props) => {  
    return (
        <div className={styles.container}>
            <TopBar head="Map" /> 

            <MapComp />
        </div>
    )
}

export default Map;