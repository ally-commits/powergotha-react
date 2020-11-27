import React from 'react'
import styles from './MapComp.module.css';
import Paper from '@material-ui/core/Paper'
import { defaultCenter, mapApiKey } from '../../config/config';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux'
import {getAllWarehouse} from '../../containers/warehouse/actions'
import StoreMallDirectoryRoundedIcon from '@material-ui/icons/StoreMallDirectoryRounded';


const Marker = (props) => {
    return (
        <StoreMallDirectoryRoundedIcon
            style={{color: "red",fontSize: 40}}
        />
    )
}


const MapComp = (props) => {

    React.useEffect(() => {
        if(!props.warehouse) {
            props.getAllWarehouse();
        }
    },[props.warehouse])
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <div className={styles.headers}>
                    <div className={styles.label}>
                        <p>Warehouse</p>
                        <StoreMallDirectoryRoundedIcon
                            style={{color: "red",fontSize: 30}}
                        />
                    </div>
                </div>

                <div className={styles.mapContent}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: mapApiKey}}
                        defaultCenter={defaultCenter}
                        defaultZoom={12}
                    >
                        {props.warehouse && props.warehouse.map(val => {
                            return (
                                <Marker 
                                    marker={val} 
                                    lat={val.coordinates[0]}
                                    lng={val.coordinates[1]}
                                />
                            )
                        })} 
                    </GoogleMapReact>
                </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    warehouse : state.warehouse.warehouse
})
export default connect(mapStateToProps,{getAllWarehouse})(MapComp);